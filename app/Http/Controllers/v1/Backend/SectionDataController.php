<?php

namespace App\Http\Controllers\v1\Backend;

use Inertia\Inertia;
use App\Models\Field;
use App\Models\Section;
use App\Models\Component;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class SectionDataController extends Controller
{
    public function index(Request $request) {
        $section_id = $request->section_id;
        $components = Component::with('designs')->get();
        $section = Section::find($section_id);

        // Filter content fields
        $contents = $section->fields->filter(function ($item) {
            return $item->data_type == "content";
        })->toArray(); 

        // Filter design fields
        $designs = $section->fields->filter(function ($item) {
            return $item->data_type == "design";
        })->toArray();

        return Inertia::render('Backend/Temp/Parts/SectionData/Index', [
            'contents' => $contents,
            'designs' => $designs,
            'components' => $components,
            'section' => $section,
            'template_id' => $request->template_id,
            'page_id' => $request->page_id,
        ]);
    }

    public function section_components() {
        $section_id = request()->section_id;
        $components = Component::with('designs')->get();
        $section = Section::with('component_designs')->find($section_id);
        $section_cpts = $section->component_designs;
        return Inertia::render('Backend/SectionData/Component', [
            'section_id' => $section_id,
            'section_cpts' => $section_cpts,
            'components' => $components,
            'fieldResponse' => '',
        ]);
    }

    public function section_components_store(Request $request) {
        $request->validate([
            'section_id' => 'required',
            'component_design_id' => 'required',
        ]);

        // try {
        //     ComponentSection::create([
        //         'component_design_id' => $request->component_design_id,
        //         'section_id' => $request->section_id,
        //     ]);
        // } catch (\Exception $e) {
        //     dd($e->getMessage());
        // }
        return redirect()->back();
    }

    public function contentStore(Request $request)   {
        $request->validate([
            'name' => 'required',
            'value' => 'required',
            'type' => 'required',
            'section_id' => 'required',
        ]);

        $section = Section::find($request->section_id);

        if($section) {
            $section->fields()->create([
                'name' => $request->name,
                'value' => $request->value,
                'type' => $request->type,
                'option' => $request->option,
                'data_type' => $request->data_type,
            ]);
        }

        return redirect()->back();
    }

    public function design_store(Request $request) {
        $request->validate([
            'name' => 'required',
            'value' => 'required',
            'type' => 'required',
            'section_id' => 'required',
        ]);

        $section = Section::find($request->section_id);

        if($section) {
            $section->fields()->create([
                'name' => $request->name,
                'value' => $request->value,
                'type' => $request->type,
                'option' => $request->option,
                'data_type' => 'design',
            ]);
        }

        return redirect()->back();
    }
}
