<?php

namespace App\Http\Controllers\v1\Backend;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class TemplateController extends Controller
{
    public function index() {
        return Inertia::render('Backend/Temp/Index', [
            'data' => "this is data",
        ]);
    }
}
