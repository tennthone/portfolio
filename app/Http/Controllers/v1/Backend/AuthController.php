<?php

namespace App\Http\Controllers\v1\Backend;

use App\Http\Controllers\Controller;
use App\Models\Admin;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class AuthController extends Controller
{
    public function index() {
        // if the auth user is admin redirect to admin dashboard 
        if(auth('admin')->user()) {
            return redirect()->route('admin.dashboard');
        } 

        return Inertia::render('Auth/Login');
    }

    public function store(Request $request) {
        $request->validate([
            'email' => 'required',
            'password' => 'required',
        ]);

        $email = $request->email;
        $password = $request->password;
        $credentials = ['email' => $email, 'password' => $password];

        $userExist = Auth::guard('admin')->attempt($credentials);

        if($userExist) {
            return to_route('admin.dashboard')->with('message', 'Login Successfully');
        } else {
            // throw error 
            return redirect()->back();
        }
    }

    public function logout() {
        Auth::guard('admin')->logout();
        return to_route('admin.login.index');
    }
    
}
