<?php

use App\Http\Controllers\v1\Backend\AdminController;
use Illuminate\Support\Facades\Route;

Route::match(['get', 'post'], '/', [AdminController::class, 'index'])->name('admin.admin-management');
Route::get('/edit/{id}', [AdminController::class, 'edit'])->name('admin.admin-management.edit');
Route::post('/edit/{id}', [AdminController::class, 'update'])->name('admin.admin-management.update');
Route::post('/store', [AdminController::class, 'store'])->name('admin.admin-management.store');
Route::post('/change-status/{id}', [AdminController::class, 'changeStatus'])->name('admin.admin-management.change-status');
Route::post('/change-password/{id}', [AdminController::class, 'changePassword'])->name('admin.admin-management.change-password');
Route::delete('/delete/{id}', [AdminController::class, 'delete'])->name('admin.admin-management.delete');