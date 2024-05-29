<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('media_libraries', function (Blueprint $table) {
            $table->id();
            $table->integer('medialbe_id');
            $table->string('mediable_type');
            $table->integer('parent_id')->nullable();
            $table->string('type')->comment('file or folder')->default('file');
            $table->string('name');
            $table->string('path');
            $table->string('mimetype')->comment('png, jpg, etc');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('media_libraries');
    }
};
