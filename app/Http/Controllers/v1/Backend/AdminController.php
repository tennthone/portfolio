<?php

namespace App\Http\Controllers\v1\Backend;

use App\Helpers\FileHelper;
use App\Http\Controllers\Controller;
use App\Http\Resources\Backend\AdminResource;
use App\Models\Admin;
use App\Services\UserService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Spatie\Permission\Models\Role;

class AdminController extends Controller
{
    public function index(Request $request)
    {
        $requestMethod = $request->getMethod();
        $searchableFields = ['name', 'email', 'phone', 'gender', 'address'];
        $searchData = $request->all();
        $admin = new Admin();
        $userService = new UserService($admin);
        $userData = $userService->getUserData($searchableFields, $requestMethod, $searchData);
        return Inertia::render('Admin/Index', [
            'admins' => AdminResource::collection($userData['admins']),
            'trashAdmins' => AdminResource::collection($userData['trash_admins']),
            'roles' => Role::where('name', '!=', 'superadmin')->get(),
            'totalValidCount' => $userData['validCount'],
            'totalTrashCount' => $userData['trashCount'],
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'email' => 'required',
            'roles' => 'required',
        ]);

        try {
            DB::transaction(function () use ($request) {
                $admin = Admin::create([
                    'name' => $request->name,
                    'email' => $request->email,
                    'phone' => $request->phone,
                    'password' => Hash::make('password'),
                    'description' => $request->description,
                ]);

                // assign role to new user 

                if ($roles = $request->roles) {
                    $admin->assignRole($roles);
                }

                // store profile image 
                if ($request->hasFile('profile_image')) {
                    $file = $request->file('profile_image');
                    $path = FileHelper::uploadFile($file, 'admin/profile');
                    $admin->image()->create([
                        'path' => $path
                    ]);
                }
            });
        } catch (\Exception $e) {
            dd($e->getMessage());
        }

        return redirect()->back()->with('success', 'Admin created successfully');
    }

    public function changeStatus(Request $request, $id)
    {
        $admin = Admin::find($id);
        if ($admin) {
            $admin->update([
                'isActive' => $request->isActive,
            ]);
            return redirect()->back()->with('success', 'Admin updated successfully');
        }

        return redirect()->back()->with('error', 'Admin not found');
    }

    public function edit($id)
    {
        $admin = Admin::withTrashed()->find($id);
        return Inertia::render('Admin/Edit', [
            'admin' => new AdminResource($admin),
            'roles' => Role::where('name', '!=', 'superadmin')->get(),
        ]);
    }

    public function update(Request $request, $id)
    {
        // validate name and email 
        $admin = Admin::find($id);

        $request->validate([
            'name' => 'required',
            'email' => 'required|email|unique:admins,email,' . $admin->id,
        ]);

        // update roles

        if ($roles = $request->roles) {
            $admin->assignRole($roles);
        }

        if ($request->file('profile_image')) {
            // update file 
            $file = $request->file('profile_image');
            $path = FileHelper::updateFile($admin->image->path, $file, 'admin/profile');
            $admin->image->update([
                'path' => $path,
            ]);
        }

        if ($admin) {
            $admin->update([
                'name' => $request->name,
                'email' => $request->email,
                'phone' => $request->phone,
                'address' => $request->address,
                'description' => $request->description,
                'social' => json_encode($request->social),
                'gender' => $request->gender,
            ]);
        } else {
            return redirect()->back()->with('error', 'Admin not found');
        }
    }

    public function changePassword(Request $request, $id)
    {
        $request->validate([
            'current_password' => 'required',
            'new_password' => 'required | min:8 | max:16',
            'confirm_password' => 'required | same:new_password'
        ]);

        $admin = Admin::find($id);

        if ($admin) {
            $currentPassword = $request->current_password;
            $newPassword = $request->new_password;
            $checked = Hash::check($currentPassword, $admin->password);
            if (!$checked) {
                throw ValidationException::withMessages([
                    'current_password' => 'Password do not match'
                ]);
            }
            // update admin password 
            $admin->update([
                'password' => Hash::make($newPassword),
            ]);

            return redirect()->back()->with('success', 'Password updated successfully');
        }

        return redirect()->back()->with('error', 'Admin not found');
    }

    public function softDelete($id)
    {
        $admin = Admin::find($id);
        if ($admin) {
            $admin->delete();
            return redirect()->back()->with('success', 'Admin deleted successfully');
        }
        return redirect()->back()->with('error', 'Admin not found');
    }

    public function delete($id)
    {
        $admin = Admin::withTrashed()->find($id);
        if ($admin) {
            $admin->forceDelete(); // Correct syntax for permanently deleting a record
            return redirect()->back()->with('success', 'Admin deleted successfully');
        }
        return redirect()->back()->with('error', 'Admin not found');
    }

    public function restore($id)
    {
        $admin = Admin::withTrashed()->find($id);
        if ($admin) {
            $admin->restore();
            return redirect()->back()->with('success', 'Admin restored successfully');
        }
        return redirect()->back()->with('error', 'Admin not found');
    }
}
