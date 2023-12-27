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

        $data = [
            'name' => $request->name,
            'value' => $request->value,
            'type' => $request->type,
            'option' => $request->option,
            'data_type' => $request->data_type,
        ];

        $modelName = $request->model_name;
        $modelId = $request->model_id;
        TemplateDataStoreService::storeData($data, $modelName, $modelId);

        return redirect()->back();
    }
}
