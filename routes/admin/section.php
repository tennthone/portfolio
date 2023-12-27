<?php

use App\Http\Controllers\v1\Backend\SectionController;
use App\Http\Controllers\v1\Backend\SectionDataController;
use Illuminate\Support\Facades\Route;

Route::get('/', [SectionController::class, 'index'])->name('admin.template.section');
Route::post('/store', [SectionController::class, 'store'])->name('admin.template.section.store');
Route::post('/update/{id}', [SectionController::class, 'update'])->name('admin.template.section.update');
Route::post('/change-status', [SectionController::class, 'changeStatus'])->name('admin.template.section.change-status');

// Section Data 

Route::get('/data', [SectionDataController::class, 'index'])->name('admin.template.section.data');