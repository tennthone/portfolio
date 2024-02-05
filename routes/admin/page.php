<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\v1\Backend\PageController;

Route::controller(PageController::class)->group(function() {
    Route::get('/', 'index')->name('admin.template.page');
    Route::post('/store', 'store')->name('admin.template.page.store');
    Route::post('/update/{id}', 'update')->name('admin.template.page.update');
    Route::post('/change-isresource', 'changeResource')->name('admin.template.page.change-resource');
});