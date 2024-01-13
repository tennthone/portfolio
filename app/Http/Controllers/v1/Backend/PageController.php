<?php

namespace App\Http\Controllers\v1\Backend;

use App\Models\Page;
use Inertia\Inertia;
use App\Models\Field;
use App\Models\Template;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\UseCase\FetchFieldData;

class PageController extends Controller
{

    public function index(Request $request) {
        $template_id = $request->template_id;
        $pages = Page::where('template_id', $template_id)->get();
        $template = Template::with('fields')->find($template_id);
        $field_id = $request->field_id;

        // fetch field data 
        $fetchFieldData = new FetchFieldData();
        $field_data = $fetchFieldData($template, $field_id);
        
        return Inertia::render('Backend/Temp/Parts/Page/Index', [
            'pages' => $pages->transform(function($item) {
                return [
                    'id' => $item->id,
                    'isResource' => $item->isResource,
                    'name' => $item->name,
                    'value' => $item->value,
                ];
            }),
            'template' => $template,
            'contents' => $field_data['contents'],
            'designs' => $field_data['designs'],
            'field' => array_key_exists('field', $field_data) ? $field_data['field'] : null
        ]);
    }

    public function store(Request $request) {
        $request->validate([
            'template_id' => 'required',
        ]);

        Page::create([
            'template_id' => $request->template_id,
            'parent_id' => null,
        ]);

        return redirect()->back();
    }

    public function update(Request $request, $id) {
        $request->validate([
            'name' => 'required',
            'value' => 'required',
        ]);

        $page = Page::find($id);
        if($page) {
            $page->update([
                'name' => $request->name,
                'value' => $request->value,
            ]);
            return redirect()->back();
        }

    }

    public function changeResource(Request $request) {
        $isResource = $request->isResource;
        $page = Page::find($request->id);
        $page->update([
            'isResource' => $isResource == true ? 1 : 0
        ]);
        return redirect()->back();
    }
}
