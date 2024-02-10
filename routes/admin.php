<?php

use App\Http\Controllers\v1\Backend\AuthController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Auth  routes 
Route::get('login', [AuthController::class, 'index'])->name('login');
Route::get('/', [AuthController::class, 'index'])->name('login');
Route::post('/login/store', [AuthController::class, 'store'])->name('admin.login.store');

Route::prefix('admin')->middleware(['auth:admin'])->group(function () {
    Route::post('/logout', [AuthController::class, 'logout'])->name('admin.logout');
    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    })->name('admin.dashboard');

    // Template Rotues 
    Route::prefix('template')->group(base_path('routes/admin/template.php'));
    Route::prefix('setting')->group(function () {
        Route::prefix('permission')->group(base_path('routes/admin/permission.php'));
    });
    Route::prefix('field')->group(base_path('routes/admin/field.php'));
    Route::prefix('admin-management')->group(base_path('routes/admin/admin.php'));
    Route::prefix('member-management')->group(base_path('routes/admin/member.php'));
    Route::prefix('general-setting')->group(base_path('routes/admin/general-setting.php'));
});
