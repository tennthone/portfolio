<?php

namespace Database\Seeders;

use App\Models\GeneralSetting;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class GeneralSettingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // add title
        GeneralSetting::create([
            'name' => 'title',
            'value' => 'Tennthone',
            'category' => 'metadata',
            'type' => 'text',
            'created_by' => 1,
        ]);

        // add logo image
        GeneralSetting::create([
            'name' => 'logo',
            'value' => 'Tennthone',
            'category' => 'metadata',
            'type' => 'text',
            'created_by' => 1,
        ]);
    }
}
