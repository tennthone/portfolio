<?php

use App\Http\Controllers\v1\Backend\FileController;
use App\Http\Controllers\v1\Backend\FolderController;
use App\Http\Controllers\v1\Backend\GitHubActionController;
use App\Http\Controllers\v1\Backend\GitRepoController;
use App\Http\Controllers\v1\Backend\TemplateController;
use Illuminate\Support\Facades\Route;

// Resource 

Route::prefix('resource')->group(function() {
    Route::get('/', [TemplateController::class, 'resource'])->name('admin.template.resource');
    Route::post('/store', [TemplateController::class, 'store'])->name('admin.template.store');
});
// Website 
Route::prefix('website')->group(function() {
    Route::get('/', [TemplateController::class, 'website'])->name('admin.template.website');
    Route::post('/store', [TemplateController::class, 'store'])->name('admin.template.website.store');
});
// File management 
Route::get('show-files-folders/{id}', [FileController::class, 'showFoldersAndFiles'])->name('admin.template.files-folders');

Route::get('file/data/show', [FileController::class, 'showFileContent'])->name('admin.template.file.show');
Route::post('file/content/store', [FileController::class, 'saveFileContent'])->name('admin.template.filedata.store');
Route::post('file/store', [FileController::class, 'addFile'])->name('admin.template.file.store');
Route::post('file/delete', [FileController::class, 'deleteFile'])->name('admin.template.file.delete');
Route::post('file/rename', [FileController::class, 'renameFile'])->name('admin.template.file.rename');

// Folder management 

Route::post('folder/store', [FolderController::class, 'addFolder'])->name('admin.template.folder.store');
Route::post('folder/delete', [FolderController::class, 'deleteFolder'])->name('admin.template.folder.delete');
Route::post('folder/rename', [FolderController::class, 'renameFolder'])->name('admin.template.folder.rename');

// git repos 
Route::get('/git-repos', [GitRepoController::class, 'index'])->name('admin.gitrepo.index');
Route::post('/git-repos/store', [GitRepoController::class, 'store'])->name('admin.gitrepo.store');
Route::delete('/git-repos/delete/{name}', [GitRepoController::class, 'delete'])->name('admin.gitrepo.delete');
Route::post('/git-repo/commit', [GitRepoController::class, 'initialSetUp'])->name('admin.gitrepo.commit');

// git action 
Route::post('/git-action/push', [GitHubActionController::class, 'git_push'])->name('admin.gitaction.push');
Route::post('/git-action/pull', [GitHubActionController::class, 'git_pull'])->name('admin.gitaction.pull');

Route::prefix('page')->group(base_path('routes/admin/page.php'));
Route::prefix('section')->group(base_path('routes/admin/section.php'));
Route::prefix('component')->group(base_path('routes/admin/component.php'));


