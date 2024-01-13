<?php

namespace App\Http\Controllers\v1\Backend;

use Inertia\Inertia;
use App\Models\Section;
use App\Models\Template;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use App\Models\Field;
use App\Models\Page;
use App\UseCase\FetchFieldData;

class SectionController extends Controller
{
    public function index(Request $request) {
        $page_id = $request->page_id;
        $page = Page::find($page_id);
        $sections = Section::with('pages')->whereHas('pages', function($q) use($page_id) {
            $q->where('page_id', $page_id);
        })->get();

        // fetching field data 
        $fetchFieldData = new FetchFieldData();
        $field_data = $fetchFieldData($page, $request->field_id);


        return Inertia::render('Backend/Temp/Parts/Section/Index', [
            'sections' => $sections,
            'page' => $page,
            'template_id' => $request->template_id,
            'contents' => $field_data['contents'],
            'designs' => $field_data['designs'],
            'field' => array_key_exists('field', $field_data) ? $field_data['field'] : null
        ]);
    }

    public function store(Request $request) {
        $section = Section::create([
            'name' => "Untitled Section",
            'value' => "untitled_section",
        ]);

        // calculate position
        $template = Template::with(['pages' => function ($q) use ($request) {
            $q->where('id', $request->page_id)->with(['sections' => function($q) {
                $q->orderBy('sections.id', 'desc')->take(1);
            }]);
        }])->findOrFail($request->template_id);

        $template_sections = $template->pages[0]->sections;  
        if(count($template->pages[0]->sections) > 0) {
            $position = $template_sections[0]->pivot->position;
        } else {
            $position = 0;
        }

        $section->pages()->attach([
            $request->page_id => ['position' => $position + 1]
        ]);

        return redirect()->back();
    }

    public function update(Request $request, $id) {
        $section = Section::find($id);
        if($section) {
            $section->update([
                'name' => $request->name,
                'value' => $request->value,
            ]);
        }

        return redirect()->back();
    }

    public function duplicate_sections(Request $request) {
        $request->validate([
            'section_id' => 'required',
        ]);

        $template = Template::find($request->template_id);
        if($template) {
            try {
                DB::transaction(function () use($request) {
                    $section = Section::with('fields')->with('component_designs')->find($request->section_id);
                    $fields  = $section->fields;
                    $components = $section->component_designs;
                    // Duplicate Section

                    $dup_section = $section->replicate();
                    $dup_section->name = 'Duplicate ' . $section->name;
                    $dup_section->template_id = $request->template_id;
                    $dup_section->save();

                    // Duplicate Fields 
                    foreach ($fields as $field) {
                        $dup_field =  $field->replicate();
                        $dup_field->fieldable_id = $dup_section->id;
                        $dup_field->save();
                    }

                    // Duplicate Components 

                    // foreach ($components as $cpt) {
                    //     ComponentSection::create([
                    //         'component_design_id' => $cpt->id,
                    //         'section_id' => $dup_section->id,
                    //     ]);
                    // }
                });
            } catch (\Exception $e) {
                dd($e->getMessage());
            }
        }

        return redirect()->back();
    }

    public function changeStatus(Request $request) {
        $section = Section::find($request->section_id);

        if($section) {
            $attributesToUpdate = [];

            if ($request->isResource) {
                $attributesToUpdate['isResource'] = $request->isResource;
            }

            if ($request->isVisible) {
                $attributesToUpdate['isVisible'] = $request->isVisible;
            }

            if ($request->isPremium) {
                $attributesToUpdate['isPremium'] = $request->isPremium;
            }

            $section->update($attributesToUpdate);
        }
        return redirect()->back();

    }
}
