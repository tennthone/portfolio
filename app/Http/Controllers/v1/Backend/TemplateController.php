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

    public function showFoldersAndFiles(Request $request, $template_id) {
        $base_path = $request->base_path;
        $contents = $this->getSubFolderAndFiles($base_path);
        return Inertia::render('Backend/Temp/Resource/File/Show', [
            'contents' => $contents,
            'template_id' => $template_id,
            'base_path' => $base_path,
        ]);
    }

    public function showFileData(Request $request) {
        $base_path = $request->base_path;
        if (File::exists($base_path) && File::isFile($base_path)) {
            $content = File::get($base_path);
            return Inertia::render('Backend/Temp/Resource/File/ShowFile', [
                'fileContent' => $content,
                'base_path' => $base_path,
            ]);
        } else {
            return response()->json(['error' => 'File not found'], 404);
        }
    }

    public function store(Request $request) {
        $request->validate([
            'name' => 'required',
            'remote_url' => 'required',
        ]);
        try {
            DB::transaction(function() use($request) {
                $remote_url = $request->remote_url;
                $name = $request->name;
                $branch_name = $request->branch_name;
                $git = new GitHubActionService();
                $path = $git->clone($remote_url, $name);

                $template = Template::create([
                    'name' => $name,
                    'isResource' => 1,
                ]);
        
                // create git info 
        
                GitInfo::create([
                    'template_id' => $template->id,
                    'base_path' => $path,
                    'remote_url' => $remote_url,
                    'branch_name' => $branch_name ?? 'main'
                ]);
            });
        } catch(\Exception $e) {    
            dd($e->getMessage());
        }

        return to_route('admin.template.resource');
    }

    private function getSubFolderAndFiles($path)
    {
        $contents = [];

        // Get only the immediate subdirectories in the specified path
        $dirs = File::directories($path);
        $contents['folders'] = array_map('basename', $dirs);

        // Get only the immediate files in the specified path
        $items = File::allFiles($path);
        $contents['files'] = [];

        foreach ($items as $item) {
            // Only include files directly under the root folder, not from subdirectories
            if (!File::isDirectory($item) && $item->getPath() == $path) {
                $contents['files'][] = $item->getRelativePathname();
            }
        }

        return $contents;
    }

    public function addFolder(Request $request) {
        $path = $request->base_path. '/' . 'New Folder';
        File::makeDirectory($path);
        return redirect()->back();
    }

    public function addFile(Request $request) {
        $path = $request->base_path. '/' . 'new-file.txt';
        File::put($path, 'The way the nature work');
        return redirect()->back();
    }

    public function deleteFile(Request $request) {
        $path = $request->base_path;
        if(File::exists($path)) {
            File::delete($path);
            return redirect()->back();
        }

        return redirect()->back()->with('message', 'File not found');
    }

    public function deleteFolder(Request $request) {
        $path = $request->base_path;
        File::deleteDirectory($path);
        return redirect()->back();
    }
}
