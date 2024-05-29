<?php

namespace App\Http\Controllers\v1\Backend;

use App\Http\Controllers\Controller;
use App\Models\MetaData;
use Illuminate\Http\Request;

class MetaDataController extends Controller
{
    public function store(Request $request)
    {
        MetaData::updateOrCreate(
            ['page_id' => $request->page_id],
            [
                'page_id' => $request->page_id,
                'title' => $request->title,
                'description' => $request->description,
                'keywords' => json_encode($request->keywords)
            ]
        );

        return redirect()->back();
    }
}
