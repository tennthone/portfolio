<?php

use App\Http\Controllers\v1\Backend\OfflineLibraryController;
use Illuminate\Support\Facades\Route;

Route::controller(OfflineLibraryController::class)->prefix('/')->group(function () {
    Route::get('/', 'index')->name('admin.offline-library.index');
    Route::post('/create', 'store')->name('admin.offline-library.store');
    // Route::put()->name('admin.offline-library.update');
    // Route::delete()->name('admin.offline-library.delete');
});
