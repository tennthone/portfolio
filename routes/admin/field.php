<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\v1\Backend\FieldController;

Route::post('/store', [FieldController::class, 'store'])->name('admin.data.store');
Route::post('/update/{id}', [FieldController::class, 'update'])->name('admin.data.update');