<?php

namespace App\Http\Controllers\v1\Backend;

use App\Http\Controllers\Controller;
use App\Services\TemplateDataStoreService;
use Illuminate\Http\Request;

class FieldController extends Controller
{
    public function store(Request $request) {
        $request->validate([
            'name' => 'required',
            'value' => 'required',
            'type' => 'required',
            'model_id' => 'required',
            'model_name' => 'required',
        ]);
        
        if($request->type == "boolean") {
            $apperance = json_encode([
                'bool' => [
                    'trueLable' => "Yes",
                    'falseLable' => "No",
                ],
            ]);
            $default = "none";
        }

        $data = [
            'name' => $request->name,
            'value' => $request->value,
            'type' => $request->type,
            'option' => $request->option,
            'data_type' => $request->data_type,
            'apperance' => isset($apperance) ? $apperance : null,
            'default_value' => isset($default) ? $default : null,
        ];

        $modelName = $request->model_name;
        $modelId = $request->model_id;
        $response = TemplateDataStoreService::storeData($data, $modelName, $modelId);

        if($response) {
            return redirect()->back()->with('success', 'Field Created Successfully');
        } else {
            return redirect()->back()->with('error', 'Model Not Found');
        }
    }

    public function update(Request $request, $id) {
        $data = [
            'name' => $request->name,
            'value' => $request->value,
            'default_value' => $request->default_value,
            'validation' => json_encode($request->validation),
            'apperance' => json_encode($request->apperance),
        ];

        $response = TemplateDataStoreService::updateData($data, $id);
        if($response) {
            return redirect()->back()->with('success', 'Field Updated Successfully');
        } else {
            return redirect()->back()->with('error', 'Field Not Found');
        }
    }
}
