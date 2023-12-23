<?php

use App\Http\Controllers\v1\Backend\GitRepoController;
use App\Http\Controllers\v1\Backend\TemplateController;
use Illuminate\Support\Facades\Route;

Route::get('/', [TemplateController::class, 'index'])->name('admin.template.index');

// git repos 
Route::get('/git-repos', [GitRepoController::class, 'index'])->name('admin.gitrepo.index');
Route::post('/git-repos/store', [GitRepoController::class, 'store'])->name('admin.gitrepo.store');
Route::delete('/git-repos/delete/{name}', [GitRepoController::class, 'delete'])->name('admin.gitrepo.delete');