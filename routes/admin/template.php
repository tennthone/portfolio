<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function() {
    return Inertia::render('Backend/Temp/Index', [
        'data' => "this is data",
    ]);
})->name('admin.template.index');