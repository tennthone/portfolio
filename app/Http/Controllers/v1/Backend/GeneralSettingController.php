<?php

namespace App\Http\Controllers\v1\Backend;

use App\Helpers\FileHelper;
use App\Http\Controllers\Controller;
use App\Http\Requests\GeneralSettingUpdateRequest;
use App\Http\Resources\GeneralSettingResource;
use App\Models\GeneralSetting;
use App\Traits\HasSimpleFilter;
use Illuminate\Http\Request;
use Inertia\Inertia;

class GeneralSettingController extends Controller
{
    use HasSimpleFilter;
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $gs_model = new GeneralSetting();
        $query = $gs_model->newQuery();

        if($request->has('search')) {
            $query = $this->applySimpleFilter($query, ['name', 'value', 'type', 'category'], $request->search);
        }
        
        $gs = $query->get();

        if($request->id) {
            $gs_detail = GeneralSetting::find($request->id);
        }

        return Inertia::render('GeneralSetting/Index', [
            'gs' => GeneralSettingResource::collection($gs),
            'gs_detail' => isset($gs_detail) ? new GeneralSettingResource($gs_detail) : []
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(GeneralSettingUpdateRequest $request)
    {
        if($request->type == 'file') {
            $file = $request->file('value');
            $value = FileHelper::uploadFile($file, 'admin/general-setting');
        } else {
            $value = $request->value;
        }

        GeneralSetting::create([
            'name' => $request->name,
            'value' => $request->value,
            'type' => $request->type,
            'category' => $request->category,
            'created_by' => auth('admin')->id(),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(GeneralSettingUpdateRequest $request, $id)
    {
        $gs = GeneralSetting::find($id);
        $value = "";
        if($request->type == 'file') {
            $file = $request->file('value');
            $value = FileHelper::updateFile($gs->value, $file, 'admin/general-setting');
        } else {
            $value = $request->value;
        }

        $gs->update([
            'name' => $request->name,
            'value' => $value,
            'type' => $request->type,
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(GeneralSetting $generalSetting)
    {
        //
    }
}
