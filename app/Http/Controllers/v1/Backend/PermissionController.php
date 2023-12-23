<?php

namespace App\Http\Controllers\v1\Backend;

use Inertia\Inertia;
use Illuminate\Http\Request;
use Spatie\Permission\Models\Role;
use App\Http\Controllers\Controller;
use Spatie\Permission\Models\Permission;

class PermissionController extends Controller
{   
    public function index() {
        return Inertia::render('Backend/Permission/Edit');
    }

    public function edit($id) {
        $role = Role::findById($id);
        $user_permissions = $role->getAllPermissions()->pluck('name');
        $permissions = Permission::latest('id')->get(['id', 'name']);
        return Inertia::render('Backend/Setting/PermissionEdit', [
            'user_permissions' => $user_permissions,
            'all_permissions' => $permissions,
            'role' => $role,
        ]);
    }

    public function update(Request $request, $id) {
        $role = Role::findOrFail($id);
        $permission = Permission::findById($request->permission_id);
        if($role->hasDirectPermission($permission)) {
            $role->revokePermissionTo($permission->name);
        } else {
            $role->givePermissionTo($permission);
        }
    }
}
