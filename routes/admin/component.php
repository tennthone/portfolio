<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\v1\Backend\ComponentController;

Route::get('/', [ComponentController::class, 'index'])->name('admin.template.component.index');
Route::post('/store', [ComponentController::class, 'store'])->name('admin.template.component.store');
Route::post('/update/{id}', [ComponentController::class, 'update'])->name('admin.template.component.update');

// Component Designs 

Route::prefix('component')->group(base_path('routes/admin/component-design.php'));