<?php

use App\Http\Controllers\v1\Backend\TemplateController;
use Illuminate\Support\Facades\Route;

// Resource 

Route::controller(TemplateController::class)->prefix('resource')->group(function() {
    Route::get('/', 'resource')->name('admin.template.resource');
    Route::post('/store', 'store')->name('admin.template.store');
});
// Website 
Route::controller(TemplateController::class)->prefix('website')->group(function() {
    Route::get('/', 'website')->name('admin.template.website');
    Route::post('/store', 'store')->name('admin.template.website.store');
});

// File and Folder management 
Route::prefix('/')->group(base_path('routes/admin/file.php'));
// git hub services 
Route::prefix('/')->group(base_path('routes/admin/github.php'));
Route::prefix('page')->group(base_path('routes/admin/page.php'));
Route::prefix('section')->group(base_path('routes/admin/section.php'));
Route::prefix('component')->group(base_path('routes/admin/component.php'));


