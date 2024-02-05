<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\v1\Backend\ComponentController;

Route::controller(ComponentController::class)->group(function() {
    Route::get('/', 'index')->name('admin.template.component.index');
    Route::post('/store', 'store')->name('admin.template.component.store');
    Route::post('/update/{id}', 'update')->name('admin.template.component.update');
});

// Component Designs 

Route::prefix('design')->group(base_path('routes/admin/component-design.php'));