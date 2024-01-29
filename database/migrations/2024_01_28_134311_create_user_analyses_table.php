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
        Schema::create('user_analyses', function (Blueprint $table) {
            $table->id();
            $table->integer('analysiable_id');
            $table->string('analysiable_type');
            $table->timestamp('last_login_time')->nullable();
            $table->string('last_login_device')->nullable();
            $table->foreignId('devicable_id')->constrained('user_devices')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('user_analyses');
    }
};
