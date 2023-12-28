<?php

namespace App\Http\Controllers\v1\Backend;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Component;
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
        return Inertia::render('Backend/Temp/Component/ComponentDesign/Index', [
            'cpt' => $cpt,
            'cpt_designs' => $cpt->designs,
            'contents' => $contents,
            'designs' => $designs,
        ]);
    }
}
