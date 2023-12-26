<?php

namespace App\Http\Controllers\v1\Backend;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\File;

class FolderController extends Controller
{
    public function renameFolder(Request $request) {
        $path = $request->path;
        $destination = $request->destination;
        try {
            if (!File::exists($destination)) {
                File::moveDirectory($path, $destination);
            } else {
                throw new \Exception("Destination directory already exists");
            }
        } catch (\Exception $e) {
            dd($e->getMessage());
        }
        return redirect()->back();
    }


    public function deleteFolder(Request $request) {
        $path = $request->base_path;
        if(File::exists($path)) {
            File::deleteDirectory($path);
        }
        return redirect()->back();
    }


    public function addFolder(Request $request) {
        $path = $request->base_path. '/' . 'New Folder';
        if(!File::exists($path)) {
            File::makeDirectory($path);
        }
        return redirect()->back();
    }
}
