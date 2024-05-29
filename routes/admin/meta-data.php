<?php

use App\Http\Controllers\v1\Backend\MetaDataController;
use Illuminate\Support\Facades\Route;

Route::controller(MetaDataController::class)->prefix('meta-data')->group(function () {
    Route::post('/create', 'store')->name('admin.page.meta-data');
});
