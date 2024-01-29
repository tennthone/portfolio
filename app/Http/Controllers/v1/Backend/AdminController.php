<?php

namespace App\Http\Controllers\v1\Backend;

use App\Http\Controllers\Controller;
use App\Http\Resources\Backend\AdminResource;
use App\Models\Admin;
use App\UseCase\SortField;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Spatie\Permission\Models\Role;

class AdminController extends Controller
{
    public function index(Request $request) {
        $page = $request->page ?? 1;
        $perpage = $request->perpage ?? 5;

        $query = Admin::with('roles')->whereHas('roles',function($q) {
            $q->where('name', '!=', 'superadmin');
        });

        if($request->isMethod('post')) {
            $sortBy = $request->sortBy;
            $field = $request->field;
            $modelName = $request->modelName;
            if($sortBy || $field || $modelName) {
                $sortField = new SortField();
                $query = $sortField($sortBy, $field, $modelName, $query);
            }
        }

        // get admin 
        if($request->admin) {
            $admin = Admin::find($request->admin);
        }
        // search wildcard  
        if($search = $request->search) {
            $admins = $query->where('name', 'like', '%' .$search . '%')
                            ->orWhere('email', 'like', '%' .$search . '%')
                            ->orWhere('phone', 'like', '%' .$search . '%');
        }

        // Advanced search 
        if($name = $request->name) {
            $admins = $query->where('name', 'like', '%' .$name.'%'); 
        }

        if($email = $request->email) {
            $admins = $query->where('email', 'like', '%' .$email.'%'); 
        }

        if($phone = $request->phone) {
            $admins = $query->where('phone', 'like', '%' .$phone.'%'); 
        }

        if($role = $request->role) {
            $admins = $query->whereHas('roles', function ($q) use($role) {
                $q->where('name', $role);
            }); 
        }

        if($request->status != "") {
            $status = $request->status == "true" ? 1 : 0;
            $admins = $query->where('isActive', $status);
        }

        // filter by year 
        $startYear = $request->startYear;
        $endYear = $request->endYear;
        if($startYear && $endYear) {
            $admins = $query->whereYear('created_at', '>=', $startYear)
                            ->whereYear('created_at', '<=', $endYear)
                            ->get();
        }

        // filter by month 
        $startMonth = $request->startMonth;
        $endMonth = $request->endMonth;
        if($startMonth && $endMonth) {
            $admins = $query->whereMonth('created_at', '>=', $startMonth)
                            ->whereMonth('created_at', '<=', $endMonth)
                            ->get();
        }

        // filter by date 
        $startDate = $request->startDate;
        $endDate = $request->endDate;
        if($startDate && $endDate) {
            $admins = $query->whereDate('created_at', '>=', $startDate)
                            ->whereDate('created_at', '<=', $endDate)
                            ->get();
        }

        $admins = $query->skip(($page - 1) * $perpage)->take($perpage)->get();
        return Inertia::render('Backend/Admin/Index', [
            'admins' => AdminResource::collection($admins),
            'roles' => Role::where('name', '!=', 'superadmin')->get(),
            'admin' => isset($admin) ? $admin : [],
            'totalCount' => Admin::whereHas('roles', function($q) {
                $q->where('name', '!=', 'superadmin');
            })->count(),
        ]);
    }

    public function store(Request $request) {
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
                
                if($roles = $request->roles) {
                    $admin->assignRole($roles);
                }
        
                // store profile image 
                if($request->hasFile('profile_image')) {
                    $file = $request->file('profile_image');
                    $filename = time() . '_' .$file->getClientOriginalName();
                    $path = Storage::putFileAs('admin/profile', $file, $filename);
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

    public function changeStatus(Request $request, $id) {
        $admin = Admin::find($id);
        if($admin) {
            $admin->update([
                'isActive' => $request->isActive,
            ]);
            return redirect()->back()->with('success', 'Admin updated successfully');
        }

        return redirect()->back()->with('error', 'Admin not found');
    }

    public function edit($id) {
        $admin = Admin::find($id);
        return Inertia::render('Backend/Admin/Edit', [
            'admin' => new AdminResource($admin),
            'roles' => Role::where('name' , '!=', 'superadmin')->get(),
        ]);
    }

    public function update(Request $request, $id) {
        // validate name and email 
        $admin = Admin::find($id);

        $request->validate([
            'name' => 'required',
            'email' => 'required|email|unique:admins,email,' . $admin->id,
        ]);


        // update roles o

        if($roles = $request->roles) {
            $admin->assignRole($roles);
        }

        if($request->file('profile_image')) {
            // delete file 
            if(Storage::exists($admin->image->path)) {
                Storage::delete($admin->image->path);
            }
            $file = $request->file('profile_image');
            $filename = time() . '_' . $file->getClientOriginalName();
            $path = 'admin/profile';
            $path = Storage::putFileAs($path, $file, $filename);

            $admin->image->update([
                'path' => $path,
            ]);
        }

        if($admin) {
             $admin->update([
                'name' => $request->name,
                'email' => $request->email,
                'phone' => $request->phone,
                'address' => $request->address,
                'description' => $request->description,
                'social' => json_encode($request->social),
             ]);
        } else {
            return redirect()->back()->with('error', 'Admin not found');
        }
    }

    public function changePassword(Request $request, $id) {
        $request->validate([
            'current_password' => 'required',
            'new_password' => 'required | min:8 | max:16',
            'confirm_password' => 'required | same:new_password'
        ]);

        $admin = Admin::find($id);
        
        if($admin){
            $currentPassword = $request->current_password;
            $newPassword = $request->new_password;
            $checked = Hash::check($currentPassword, $admin->password);
            if(!$checked) {
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

    public function delete($id) {
        $admin = Admin::find($id);
        if($admin) {
            $admin->delete();
            return redirect()->back()->with('success', 'Admin deleted successfully');
        }
        return redirect()->back()->with('error', 'Admin not found');
    }
}
