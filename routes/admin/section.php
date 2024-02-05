<?php

use App\Http\Controllers\v1\Backend\SectionController;
use App\Http\Controllers\v1\Backend\SectionDataController;
use Illuminate\Support\Facades\Route;

Route::controller(SectionController::class)->group(function() {
    Route::get('/', 'index')->name('admin.template.section');
    Route::post('/store', 'store')->name('admin.template.section.store');
    Route::post('/update/{id}', 'update')->name('admin.template.section.update');
    Route::post('/change-status', 'changeStatus')->name('admin.template.section.change-status');
});

// Section Data 

Route::controller(SectionDataController::class)->group(function() {
    Route::get('/data', 'index')->name('admin.template.section.data');
    Route::post('/data/component-design/store', 'addComponentDesign')->name('admin.template.section.data.store');
    Route::post('/data/component-design/delete/{id}', 'removeComponentDesign')->name('admin.template.section.component-design.delete');
});

// update field 