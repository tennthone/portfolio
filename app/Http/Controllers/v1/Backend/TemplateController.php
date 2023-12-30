<?php

namespace App\Http\Controllers\v1\Backend;

use Inertia\Inertia;
use App\Models\GitInfo;
use App\Models\Template;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\File;
use App\Services\GitHubActionService;
use App\Services\TemplateService;
use Illuminate\Validation\ValidationException;

class TemplateController extends Controller
{
    public function resource() {
        $templates = Template::with('git_info')->where('isResource', 1)->get();
        return Inertia::render('Backend/Temp/Resource/Index', [
            'templates' => $templates,
        ]);
    }

    public function website() {
        $templates = Template::with('git_info')->where('isResource', 0)->get();
        return Inertia::render('Backend/Temp/Website/Index', [
            'templates' => $templates,
        ]);
    }

    public function store(Request $request) {
        $request->validate([
            'name' => 'required',
            // 'remote_url' => 'required',
            'branch_name' => 'required',
            'template_usage' => 'required',
        ]);

        $templateData = array(
            'template_usage' => $request->template_usage,
            'remote_url' => $request->remote_url,
            'name' => $request->name,
            'branch_name' => $request->branch_name,
            'template_id' => $request->template_id,
        );
        
        $template = new TemplateService();
        if($request->template_usage == "resource") {
            $res= $template->createResource($templateData);
        } else {
            $res = $template->createWebsite($templateData);
            if($res['success']) {
                return redirect()->back()->with('success', $res['message']);
            } else {
                return redirect()->back()->with('error', $res['message']);
            }
        }
    }  
}


