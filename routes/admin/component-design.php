<?php

use App\Http\Controllers\v1\Backend\ComponentDesignController;
use Illuminate\Support\Facades\Route;

Route::get('/', [ComponentDesignController::class, 'index'])->name('admin.template.component.design.index');