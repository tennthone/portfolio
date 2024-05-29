<?php

namespace App\Services;

use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;

class OfflineLibraryService
{
    // upload zip files 
    public function upload_zipfile($file, $filename, $og_filename)
    {
        // store zipfile
        $path = Storage::putFileAs('uploads/zipfile', $file, $filename);
        $zip = new \ZipArchive;

        if ($zip->open(storage_path('app/public/' . $path), \ZipArchive::CREATE) === true) {
            try {
                // unzip file
                $exactFile = storage_path('app/uploads');
                $zip->extractTo($exactFile);
                $zip->close();
                $extractedFiles = File::directories($exactFile . '/' . $og_filename);
                dd(array_map('basename', $extractedFiles));
                $pages = [];
                foreach ($extractedFiles as $file) {
                    if ($file->isDir()) {
                        $pages[] = $file->getFilename();
                    }
                }
                dd($pages);
                // move to filepath 
                $destinationPath = storage_path('app/public/templates/resources/' . $filename);

                // create path 
                if (!File::exists($destinationPath)) {
                    File::makeDirectory($destinationPath, 0755, true, true);
                }

                File::move(storage_path('app/uploads/' . $og_filename), $destinationPath);

                // deletezip file
                Storage::delete($path);
                File::deleteDirectory(storage_path('app/template'));

                return [
                    'succes' => true,
                    'message' => 'Zipfile uploaded successfully'
                ];
            } catch (\Exception $e) {
                return [
                    'success' => false,
                    'message' => $e->getMessage(),
                ];
            }
        } else {
            // Handle error
            return [
                'success' => false,
                'message' => "Zip file can't be opened",
            ];
        }
    }

    // upload single file
    public function upload_single_file()
    {
        // do something
    }

    // upload multiple files
    public function upload_multiple_files()
    {
        // do something
    }

    public function delete_files()
    {
        // check if there are usage in templates

        // delete files 
    }
}
