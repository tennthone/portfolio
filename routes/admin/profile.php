<?php

use App\Http\Controllers\v1\Backend\ProfileController;
use Illuminate\Support\Facades\Route;

Route::controller(ProfileController::class)->group(function() {
    Route::get('show/{id}', 'show')->name('admin.profile.show');
    Route::post('update/{id}', 'update')->name('admin.profile.update');
    Route::post('change_password/{id}', 'changePassword')->name('admin.change-password');
});