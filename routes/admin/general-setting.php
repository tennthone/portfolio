<?php

use App\Http\Controllers\GeneralSettingController;
use Illuminate\Support\Facades\Route;

Route::controller(GeneralSettingController::class)->group(function() {
    Route::get('/', 'index')->name('admin.general-setting.index');
    Route::post('/update/{id}', 'update')->name('admin.general-setting.update');
});