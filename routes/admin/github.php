<?php

use App\Http\Controllers\v1\Backend\GitHubActionController;
use App\Http\Controllers\v1\Backend\GitRepoController;
use Illuminate\Support\Facades\Route;

Route::controller(GitRepoController::class)->prefix('git-repos')->group(function() {
    Route::get('/', 'index')->name('admin.gitrepo.index');
    Route::post('/store', 'store')->name('admin.gitrepo.store');
    Route::delete('/delete/{name}', 'delete')->name('admin.gitrepo.delete');
    Route::post('/commit', 'initialSetUp')->name('admin.gitrepo.commit');
});

// git action 
Route::controller(GitHubActionController::class)->prefix('git-action')->group(function() {
    Route::post('/push', 'git_push')->name('admin.gitaction.push');
    Route::post('/pull', 'git_pull')->name('admin.gitaction.pull');
});