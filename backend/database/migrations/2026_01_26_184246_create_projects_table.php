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
        Schema::create('projects', function (Blueprint $table) {
            $table->id();
            $table->foreignId('client_id')->constrained()->onDelete('cascade');
            $table->string('title');
            $table->text('description')->nullable();
            $table->string('type', 100)->nullable()->comment('e.g., Web, Mobile, Data Engineering');
            $table->date('start_date');
            $table->date('end_date')->nullable();
            $table->decimal('budget', 12, 2)->nullable();
            $table->enum('status', ['pending', 'in_progress', 'completed', 'cancelled'])->default('pending');
            $table->integer('progress')->default(0)->comment('Progress percentage 0-100');
            $table->timestamps();

            $table->index('status');
            $table->index('client_id');
            $table->index('start_date');
        });

        // Pivot table for project-employee relationship
        Schema::create('project_employee', function (Blueprint $table) {
            $table->id();
            $table->foreignId('project_id')->constrained()->onDelete('cascade');
            $table->foreignId('employee_id')->constrained()->onDelete('cascade');
            $table->string('role', 100)->nullable()->comment('Role in project: Developer, Designer, Lead, etc.');
            $table->timestamps();

            $table->unique(['project_id', 'employee_id']);
            $table->index('project_id');
            $table->index('employee_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('project_employee');
        Schema::dropIfExists('projects');
    }
};
