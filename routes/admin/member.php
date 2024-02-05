<?php

use App\Http\Controllers\v1\Backend\MemberController;
use Illuminate\Support\Facades\Route;

Route::get('/', [MemberController::class, 'index'])->name('admin.member-management');