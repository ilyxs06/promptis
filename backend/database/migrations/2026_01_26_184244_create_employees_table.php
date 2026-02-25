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
        Schema::create('employees', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade')->unique();
            $table->string('phone', 20)->nullable();
            $table->string('position', 100);
            $table->string('department', 100)->nullable();
            $table->json('skills')->nullable()->comment('Array of technical skills');
            $table->date('hire_date')->nullable();
            $table->string('profile_photo')->nullable();
            $table->timestamps();

            $table->index('position');
            $table->index('department');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('employees');
    }
};
