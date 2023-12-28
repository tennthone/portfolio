<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\v1\Backend\PermissionController;

Route::get('/', [PermissionController::class, 'index'])->name('admin.permission.index');
Route::put('/update/{id}', [PermissionController::class, 'update'])->name('admin.permission.update');