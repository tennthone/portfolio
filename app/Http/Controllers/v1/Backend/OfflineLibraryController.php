<?php

namespace App\Http\Controllers\v1\Backend;

use App\Http\Controllers\Controller;
use App\Services\OfflineLibraryService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class OfflineLibraryController extends Controller
{
    private $offlineLibraryService;
    public function __construct()
    {
        $this->offlineLibraryService = new OfflineLibraryService();
    }

    public function index()
    {
        return Inertia::render('OfflineLibrary/Index');
    }

    public function store(Request $request)
    {
        $result = [];
        // store files 
        if ($request->hasFile('zipfile')) {
            $file = $request->file('zipfile');
            $filename = $request->filename . '.zip';
            $og_filename = pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME);
            $result = $this->offlineLibraryService->upload_zipfile($file, $filename, $og_filename);
        }
        if ($result['success']) {
            return redirect()->back();
        } else {
            // do something
        }
    }
}
