<?php 

namespace App\Helpers;

use Illuminate\Support\Facades\Storage;

class FileHelper {

    /**
     * storage file upload
     * @param $file;
     * @param string $dir;
     * @return string;
     */
    public static function uploadFile($file,$dir) {
        $filename = time() . '_' .$file->getClientOriginalName();
        $path = Storage::putFileAs($dir, $file, $filename);
        return $path;
    }

    /**
     * delete old file and store new file 
     * @param string $oldFilePath;
     * @param $file;
     * @param string $dir;
     * @return string;
     */

    public static function updateFile($oldFilePath, $file, $dir) {
        FileHelper::deleteFile($oldFilePath);
        $path = FileHelper::uploadFile($file, $dir);
        return $path;
    }

    /**
     * delete file if exists 
     * @param string $oldFilePath;
     * @return void;
     */
    public static function deleteFile($oldFilePath) {
        if(Storage::exists($oldFilePath)) {
            Storage::delete($oldFilePath);
        }
    }
}