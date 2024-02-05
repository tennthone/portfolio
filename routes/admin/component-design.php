<?php

use App\Http\Controllers\v1\Backend\ComponentDesignController;
use Illuminate\Support\Facades\Route;


Route::controller(ComponentDesignController::class)->group(function() {
    Route::get('/', 'index')->name('admin.template.component.design.index');
    Route::post('/store', 'store')->name('admin.template.component.design.store');
    Route::get('/show/{id}', 'show')->name('admin.template.component.design.show');
});