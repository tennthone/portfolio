<?php

use App\Http\Controllers\v1\Backend\GitHubActionController;
use App\Http\Controllers\v1\Backend\GitRepoController;
use App\Http\Controllers\v1\Backend\TemplateController;
use Illuminate\Support\Facades\Route;

// Resource 

Route::prefix('resource')->group(function() {
    // Content
    Route::get('/content', [TemplateController::class, 'resource_content'])->name('admin.template.resource.content');
    Route::post('/store', [TemplateController::class, 'store'])->name('admin.template.store');

    // File
    Route::get('/file', [TemplateController::class, 'resource_file'])->name('admin.template.resource.file');
});

// File management 
Route::get('show-files-folders/{id}', [TemplateController::class, 'showFoldersAndFiles'])->name('admin.template.files-folders');
Route::get('show-file-data', [TemplateController::class, 'showFileData'])->name('admin.template.file.show');
Route::post('folder/store', [TemplateController::class, 'addFolder'])->name('admin.template.folder.store');
Route::post('file/store', [TemplateController::class, 'addFile'])->name('admin.template.file.store');
Route::post('file/delete', [TemplateController::class, 'deleteFile'])->name('admin.template.file.delete');
Route::post('folder/delete', [TemplateController::class, 'deleteFolder'])->name('admin.template.folder.delete');

// git repos 
Route::get('/git-repos', [GitRepoController::class, 'index'])->name('admin.gitrepo.index');
Route::post('/git-repos/store', [GitRepoController::class, 'store'])->name('admin.gitrepo.store');
Route::delete('/git-repos/delete/{name}', [GitRepoController::class, 'delete'])->name('admin.gitrepo.delete');

// git action 
// 
Route::post('/git-action/push', [GitHubActionController::class, 'git_push'])->name('admin.gitaction.push');

