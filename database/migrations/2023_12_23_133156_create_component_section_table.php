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
        Schema::create('component_section', function (Blueprint $table) {
            $table->id();
            $table->foreignId('component_design_id')->constrained('component_designs')->onDelete('cascade');
            $table->foreignId('section_id')->constrained('sections')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('component_section');
    }
};
