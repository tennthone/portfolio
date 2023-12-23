<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\v1\Backend\AuthController;
use App\Services\GitHubService;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// Admin  routes 
Route::get('admin/login', [AuthController::class, 'index'])->name('admin.login.index');
Route::post('/login/store', [AuthController::class, 'store'])->name('admin.login.store');


Route::prefix('admin')->middleware(['auth:admin'])->group(function() {
    Route::post('/logout', [AuthController::class, 'logout'])->name('admin.logout');
    Route::get('/dashboard', function() {
        return Inertia::render('Backend/Dashboard');
    })->name('admin.dashboard');

    // Template Rotues 
    Route::prefix('template')->group(base_path('routes/admin/template.php'));
    Route::prefix('permission')->group(base_path('routes/admin/permission.php'));
});

Route::get('/clone/template', function() {
    $gitservice = new GitHubService();
    $url = "https://github.com/Newstein123/modalpopup.git";
    $name = "portfolio";
    $branch = "newton";
    $commitName ="my commit";
    $gitservice->deleteRepo($name);
});

require __DIR__.'/auth.php';
