<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\File;

class ClearStorage extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'storage:clear';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'To clear storage in the storage/app/resources directory';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        Artisan::call('migrate:fresh --seed');
        $base_path = storage_path('app/resources');
        $success = File::cleanDirectory($base_path);
        if ($success) {
            $this->info("Files and folders in '$base_path' have been successfully cleared.");
        } else {
            $this->error("Failed to clear files and folders in '$base_path'.");
        }
    }
}
