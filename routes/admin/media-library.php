<?php

use App\Http\Controllers\v1\Backend\MediaLibraryController;
use Illuminate\Support\Facades\Route;

Route::controller(MediaLibraryController::class)->group(function() {
    Route::get('/', 'index')->name('admin.media-library');
    Route::post('store', 'store')->name('admin.media-library.store');
    Route::delete('/delete/{id}', 'delete')->name('admin.media-library.delete');
});