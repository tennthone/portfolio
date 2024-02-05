<?php

namespace App\Http\Controllers\v1\Backend;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MemberController extends Controller
{
    public function index(Request $request) {
        return Inertia::render('Member/Index');
    }
}
