<?php

namespace App\Http\Controllers\v1\Backend;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Component;
use Inertia\Inertia;

class ComponentController extends Controller
{
    public function index() {
        $cpts = Component::get();
        return Inertia::render('Temp/Component/Index', [
            'cpts' => $cpts,
        ]);
    }

    public function store(Request $request) {
        $request->validate([
            'name' => 'required',
            'value' => 'required',
        ]);

        Component::create([
            'name' => $request->name,
            'value' => $request->value,
            'loopable' => $request->isLoopable,
            'max_no_loop' => $request->maxNoLoop,
        ]);

        return redirect()->back()->with('succss', "Component created successfully");
    }
}
