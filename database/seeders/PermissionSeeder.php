<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;

class PermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $permissions = [
            'create template',
            'view template',
            'edit template',
            'delete template',
            'create permission',
            'view permission',
            'edit permission',
            'delete permission',
        ];

        foreach ($permissions as $permission) {
            Permission::create([
                'guard_name' => 'admin',
                'name' => $permission,
            ]);
        }
    }
}
