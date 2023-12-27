<?php

namespace App\Http\Controllers\v1\Backend;

use App\Models\Page;
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Template;

class PageController extends Controller
{

    public function index(Request $request) {
        $template_id = $request->template_id;
        $pages = Page::where('template_id', $template_id)->get();
        $template = Template::with('fields')->find($template_id);

        // Filter content fields
        $contents = $template->fields->filter(function ($item) {
            return $item->data_type == "content";
        })->toArray(); 

        // Filter design fields
        $designs = $template->fields->filter(function ($item) {
            return $item->data_type == "design";
        })->toArray();
        
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
            'contents' => $contents,
            'designs' => $designs,
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
