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
        Schema::create('templates', function (Blueprint $table) {
            $table->id();
            $table->foreignId('category_id')->constrained('categories')->onDelete('cascade');
            $table->string('name')->default('Untitled Template');
            $table->string('value')->nullable();
            $table->json('tags')->nullable();
            $table->integer('price')->default(0);
            $table->integer('sale_price')->default(0);
            $table->boolean('isPremium')->default(0);
            $table->boolean('isResource')->default(0);
            $table->boolean('isVisbile')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('templates');
    }
};
