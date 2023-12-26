<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\v1\Backend\PageController;

Route::get('/', [PageController::class, 'index'])->name('admin.template.page');
Route::post('/store', [PageController::class, 'store'])->name('admin.template.page.store');
Route::post('/update/{id}', [PageController::class, 'update'])->name('admin.template.page.update');
Route::post('/change-isresource', [PageController::class, 'changeResource'])->name('admin.template.page.change-resource');