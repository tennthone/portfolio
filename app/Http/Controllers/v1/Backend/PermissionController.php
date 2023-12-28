<?php

namespace App\Http\Controllers\v1\Backend;

use Inertia\Inertia;
use Illuminate\Http\Request;
use Spatie\Permission\Models\Role;
use App\Http\Controllers\Controller;
use Spatie\Permission\Models\Permission;

class PermissionController extends Controller
{   
    public function index(Request $request) {
        $roles = Role::all();
        if($request->edit) {
            $data = $this->getEditData($request->edit);
        }

        return Inertia::render('Backend/Permission/Index', [
            'roles' => $roles->transform(function($item) {
                return [
                    'id' => $item->id,
                    'name' => $item->name,
                ];
            }),
            'editData' => isset($data) ? fn() => $data : [],
        ]);
    }

    private function getEditData($id) {
        $role = Role::findById($id);
        $user_permissions = $role->getAllPermissions()->pluck('name')->toArray();
        $permissions = Permission::latest('id')->get();
        return  [
            'user_permissions' => $user_permissions,
            'all_permissions' => $permissions->transform(function($item) {
                return [
                    'id' => $item->id,
                    'name' => $item->name
                ];
            }),
            'role' => $role,
        ];
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
