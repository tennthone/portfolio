<?php

namespace App\Http\Controllers\v1\Backend;

use Inertia\Inertia;
use App\Models\Field;
use App\Models\Section;
use App\Models\Component;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Resources\SectionComponentResource;

class SectionDataController extends Controller
{
    public function index(Request $request) {
        $section_id = $request->section_id;
        if($request->use_component) {
            $components = Component::with('designs')->get();
        }

        $section = Section::with(['component_designs'])->findOrFail($section_id);
        $sectionResource = new SectionComponentResource($section);
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
            'components' => isset($components) ? $components : [],
            'section' => $sectionResource,
            'template_id' => $request->template_id,
            'page_id' => $request->page_id,
        ]);
    }

    public function store(Request $request) {
        $request->validate([
            'section_id' => 'required',
            'design_id' => 'required',
        ]);

        try {
            $section = Section::with('component_designs')->find($request->section_id);
            $section->component_designs()->attach($request->design_id);
            return redirect()->back()->with('success', 'Component Set Up Successfully');
        } catch (\Exception $e) {
            return redirect()->back()->with('success', $e->getMessage());
        }
        return redirect()->back();
    }

    public function removeComponentDesign(Request $request, $id) {
        $section_id = $request->section_id;
        $section = Section::find($section_id);

        if($section) {
            $section->component_designs()->detach($id);
            return redirect()->back()->with('success', 'Component Design Remove Succesfully');
        } else {
            return redirect()->back()->with('success', 'Section Do not exist');
        }
    }
}
