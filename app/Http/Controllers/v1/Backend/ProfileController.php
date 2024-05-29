<?php

namespace App\Http\Controllers\v1\Backend;

use App\Http\Controllers\Controller;
use App\Models\Admin;
use App\UseCase\ChangePassword;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProfileController extends Controller
{
    public function show()
    {
        return Inertia::render('Profile/Index', [

        ]);
    }

    public function update()
    {
        // update user
    }

    public function changePassword(Request $request, $id)
    {
        // change user password
        $admin = Admin::find($id);

        if ($admin) {
            $data = array(
                'newPassword' => $request->new_password,
                'currentPassword' => $request->current_password,
            );
            
            $changePassword = new ChangePassword();
            $result = $changePassword($admin, $data);
            return redirect()->back()->with('success', 'Password updated successfully');
        }

        return redirect()->back()->with('error', 'Admin not found');
    }
}
