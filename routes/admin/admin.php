<?php

use App\Http\Controllers\v1\Backend\AdminController;
use Illuminate\Support\Facades\Route;

Route::controller(AdminController::class)->group(function() {
    Route::match(['get', 'post'], '/', 'index')->name('admin.admin-management');
    Route::get('/edit/{id}', 'edit')->name('admin.admin-management.edit');
    Route::post('/edit/{id}', 'update')->name('admin.admin-management.update');
    Route::post('/store', 'store')->name('admin.admin-management.store');
    Route::post('/change-status/{id}', 'changeStatus')->name('admin.admin-management.change-status');
    Route::post('/change-password/{id}', 'changePassword')->name('admin.admin-management.change-password');
    Route::delete('/soft-delete/{id}', 'softDelete')->name('admin.admin-management.soft-delete');
    Route::delete('/delete/{id}', 'delete')->name('admin.admin-management.delete');
    Route::post('/restore/{id}', 'restore')->name('admin.admin-management.restore');
});