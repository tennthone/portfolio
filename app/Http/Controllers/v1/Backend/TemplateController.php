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
use Illuminate\Validation\ValidationException;

class TemplateController extends Controller
{
    public function resource_content() {
        $templates = Template::with('git_info')->where('isResource', 1)->get();
        return Inertia::render('Backend/Temp/Resource/Content/Index', [
            'templates' => $templates,
        ]);
    }

    public function resource_file() {
        $files = Template::with('git_info')->where('isResource', 1)->get();
        return Inertia::render('Backend/Temp/Resource/File/Index', [
            'files' => $files,
        ]);
    }

    public function store(Request $request) {
        $request->validate([
            'name' => 'required',
            'remote_url' => 'required',
        ]);
        $remote_url = $request->remote_url;
        $name = $request->name;
        $branch_name = $request->branch_name;
        $git = new GitHubActionService();
        $res = $git->clone($remote_url, $name);
        if($res['success']) {
            try {
                DB::transaction(function() use($res, $remote_url, $branch_name, $name) {
                    if($res['success']) {
                        $template = Template::create([
                            'name' => $name,
                            'isResource' => 1,
                        ]);
                
                        // create git info 
                
                        GitInfo::create([
                            'template_id' => $template->id,
                            'base_path' => $res['path'],
                            'remote_url' => $remote_url,
                            'branch_name' => $branch_name ?? 'main'
                        ]);
                    } 
                });
            } catch(\Exception $e) {    
                dd($e->getMessage());
            }
        } else {
            throw ValidationException::withMessages([
                'name' => "Name already exists",
            ]);
        }
        

        return to_route('admin.template.resource.content');
    }  
}
