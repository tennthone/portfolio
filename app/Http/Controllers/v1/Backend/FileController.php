<?php

namespace App\Http\Controllers\v1\Backend;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\File;

class FileController extends Controller
{

    public function showFileContent(Request $request) {
        $template_id = $request->id;
        $base_path = $request->base_path;
        if (File::exists($base_path) && File::isFile($base_path)) {
            $content = File::get($base_path);
            return Inertia::render('Backend/Temp/Resource/File/FileContent', [
                'fileContent' => $content,
                'base_path' => $base_path,
                'template_id' => $template_id,
            ]);
        } else {
            return response()->json(['error' => 'File not found'], 404);
        }
    }

    public function saveFileContent(Request $request) {
        $content = $request->content;
        $base_path = $request->base_path;
        File::put($base_path, $content);
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

    public function renameFile(Request $request) {
        $path = $request->path;
        $destination = $request->destination;
        try {
            if(!File::exists($destination)) {
                File::put($destination, '');
            }
            
            File::move($path, $destination);
            File::delete($path);

            return redirect()->back();
        } catch (\Exception $e) {
            dd($e->getMessage());
        }
    }

    public function showFoldersAndFiles(Request $request, $template_id) {
        $base_path = $request->base_path;
        $contents = $this->getSubFolderAndFiles($base_path);
        return Inertia::render('Backend/Temp/Resource/File/FileStructure', [
            'contents' => $contents,
            'template_id' => $template_id,
            'base_path' => $base_path,
        ]);
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

}
