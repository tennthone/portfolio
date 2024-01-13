<?php

namespace App\Http\Controllers\v1\Backend;

use Inertia\Inertia;
use App\Models\Field;
use App\Models\Section;
use App\Models\Component;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Resources\SectionComponentResource;
use App\Models\ComponentDesign;
use App\Models\Template;
use App\UseCase\FetchFieldData;
use Illuminate\Support\Facades\File;

class SectionDataController extends Controller
{
    public function index(Request $request) {
        $section_id = $request->section_id;
        $field_id = $request->field_id;
        if($request->use_component) {
            $components = Component::with('designs')->get();
        }

        $section = Section::with(['component_designs'])->findOrFail($section_id);
        $sectionResource = new SectionComponentResource($section);
        
        // fetch field data 
        $fetchFieldData = new FetchFieldData();
        $field_data = $fetchFieldData($section, $field_id);

        return Inertia::render('Backend/Temp/Parts/SectionData/Index', [
            'contents' => $field_data['contents'],
            'designs' => $field_data['designs'],
            'field' => array_key_exists('field', $field_data) ? $field_data['field'] : null,
            'components' => isset($components) ? $components : [],
            'section' => $sectionResource,
            'template_id' => $request->template_id,
            'page_id' => $request->page_id,
        ]);
    }

    public function addComponentDesign(Request $request) {
        $request->validate([
            'section_id' => 'required',
            'design_id' => 'required',
            'template_id' => 'required',
        ]);

        $template_id = $request->template_id;
        $res = $this->addComponentFilesToTemplate($template_id, $request->design_id);
        
        if($res['success']) {
            try {
                $section = Section::with('component_designs')->find($request->section_id);
                $section->component_designs()->attach($request->design_id);
                return redirect()->back()->with('success', 'Component Set Up Successfully');
            } catch (\Exception $e) {
                return redirect()->back()->with('success', $e->getMessage());
            }
        } else {
            return redirect()->back()->with('success', $res['message']);
        }
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

    public function addComponentFilesToTemplate(int $template_id, int $design_id) {
        $template = Template::find($template_id);
        $design = ComponentDesign::with('component')->find($design_id);
        $path = storage_path('app/public/resources/'. $template->name .'/components');
        try {
            // make directory

            File::makeDirectory($path . '/' .$design->component->value);

            // add files 
            File::put($path .'/' .$design->component->value. '/content.html', file_get_contents(storage_path('app/components/'.$design->value. '/content.html')) );
            File::put($path .'/' .$design->component->value. '/skeleton.html', file_get_contents(storage_path('app/components/'.$design->value. '/skeleton.html')));
            return [
                'success' => true,
                'message' => 'File Created Successfully'
            ];

        } catch(\Exception $e) {
            File::deleteDirectory($path . '/' .$design->component->value);

            // add files 
            File::delete(storage_path($path .'/'.$design->value. '/content.html'));
            File::delete(storage_path($path.'/'.$design->value. '/skeleton.html'));
            return [
                'success' => false,
                'message' => $e->getMessage(),
            ];
        }
    }
}
