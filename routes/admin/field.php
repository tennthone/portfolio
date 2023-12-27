<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\v1\Backend\FieldController;

Route::post('/', [FieldController::class, 'store'])->name('admin.data.store');