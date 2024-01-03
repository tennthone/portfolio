<?php

namespace App\Http\Controllers\v1\Backend;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Component;
use App\Models\ComponentDesign;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ComponentDesignController extends Controller
{
    public function index(Request $request) {
        $cpt = Component::with('designs')->with('fields')->where('id', $request->cpt_id)->first();
        // Filter content fields
        $contents = $cpt->fields->filter(function ($item) {
            return $item->data_type == "content";
        })->toArray(); 

        // Filter design fields
        $designs = $cpt->fields->filter(function ($item) {
            return $item->data_type == "design";
        })->toArray();

        // preview data render 
        // 
        if($request->previewItem) {
            $preview_data = $this->preview($request->previewItem);
        }

        return Inertia::render('Backend/Temp/Component/ComponentDesign/Index', [
            'cpt' => $cpt,
            'cpt_designs' => $cpt->designs,
            'contents' => $contents,
            'designs' => $designs,
            'preview_data' => isset($preview_data) ? $preview_data : [],
        ]);
    }

    public function store(Request $request) {
        $request->validate([
            'name' => 'required',
            'value' => 'required',
            'component_id' => 'required',
        ]);

        $path = 'app/components/' .$request->value;
        $base_path = storage_path($path);
        if(!File::exists($path)) {
            // create component dir 
            File::makeDirectory($base_path, 0755, true);
            // create skeleton and content file 
            $content_path = $base_path. '/content.html';
            $skeleton_path =  $base_path. '/skeleton.html';
            File::put($content_path, 'Create component code');
            File::put($skeleton_path, 'Create skeleton structure for this component');
        }
        ComponentDesign::create([
            'component_id' => $request->component_id,
            'name' => $request->name,
            'value' => $request->value,
            'content' => $path .'/content.html',
            'skeleton' => $path . '/skeleton.html',
        ]);

        return redirect()->back()->with('success', 'Component Design Created Successfully');
    }

    public function show(Request $request, $id) {
        $cpt_id = $request->cpt_id;
        $cpt_dsg = ComponentDesign::find($id);

        $data = [
            'id' => $cpt_dsg->id,
            'name' => $cpt_dsg->name,
            'value' => $cpt_dsg->value,
            'content' => file_get_contents(storage_path($cpt_dsg->content)),
            'content_path' => $cpt_dsg->content,
            'skeleton' => file_get_contents(storage_path($cpt_dsg->skeleton)),
            'skeleton_path' => $cpt_dsg->skeleton,
        ];

        return Inertia::render('Backend/Temp/Component/ComponentDesign/Show', [
            'cpt_dsg' => $data,
            'cpt' => Component::find($cpt_id),
        ]);
    }

    public function preview($id) {
        $cpt_dsg = ComponentDesign::find($id);
        if($cpt_dsg) {
            // get component content files 
            if(File::exists(storage_path($cpt_dsg->content)) && File::exists(storage_path($cpt_dsg->skeleton))) {
                $content = file_get_contents(storage_path($cpt_dsg->content));
                $skeleton = file_get_contents(storage_path($cpt_dsg->skeleton));
                return [
                    'content' => $content,
                    'skeleton' => $skeleton,
                ];
            }

        } else {
            return false;
        }
    }
}
