<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('notifications', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('type'); // ticket_created, ticket_urgent, project_deadline
            $table->string('title');
            $table->text('message');
            $table->string('priority')->default('normal'); // normal, high, urgent
            $table->unsignedBigInteger('related_id')->nullable(); // ticket_id or project_id
            $table->string('related_type')->nullable(); // App\Models\Ticket or App\Models\Project
            $table->boolean('is_read')->default(false);
            $table->timestamp('read_at')->nullable();
            $table->timestamps();

            $table->index(['user_id', 'is_read']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('notifications');
    }
};
