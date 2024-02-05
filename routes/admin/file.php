<?php

use App\Http\Controllers\v1\Backend\FileController;
use App\Http\Controllers\v1\Backend\FolderController;
use Illuminate\Support\Facades\Route;

Route::controller(FileController::class)->group(function() {
    Route::get('show-files-folders/{id}', 'showFoldersAndFiles')->name('admin.template.files-folders');
    Route::get('file/data/show', 'showFileContent')->name('admin.template.file.show');
    Route::post('file/content/store', 'saveFileContent')->name('admin.template.filedata.store');
    Route::post('file/store', 'addFile')->name('admin.template.file.store');
    Route::post('file/delete', 'deleteFile')->name('admin.template.file.delete');
    Route::post('file/rename', 'renameFile')->name('admin.template.file.rename');
});


// Folder management 

Route::controller(FolderController::class)->group(function() {
    Route::post('folder/store', 'addFolder')->name('admin.template.folder.store');
    Route::post('folder/delete', 'deleteFolder')->name('admin.template.folder.delete');
    Route::post('folder/rename', 'renameFolder')->name('admin.template.folder.rename');
});