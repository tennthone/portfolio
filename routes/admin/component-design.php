<?php

use App\Http\Controllers\v1\Backend\ComponentDesignController;
use Illuminate\Support\Facades\Route;

Route::get('/', [ComponentDesignController::class, 'index'])->name('admin.template.component.design.index');
Route::post('/store', [ComponentDesignController::class, 'store'])->name('admin.template.component.design.store');
Route::get('/show/{id}', [ComponentDesignController::class, 'show'])->name('admin.template.component.design.show');