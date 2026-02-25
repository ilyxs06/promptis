<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        // Modifier la colonne status des projets pour accepter les valeurs françaises
        DB::statement("ALTER TABLE projects MODIFY COLUMN status VARCHAR(50) DEFAULT 'planifie'");

        // Modifier la colonne status des tickets
        DB::statement("ALTER TABLE tickets MODIFY COLUMN status VARCHAR(50) DEFAULT 'ouvert'");

        // Modifier la colonne priority des tickets
        DB::statement("ALTER TABLE tickets MODIFY COLUMN priority VARCHAR(50) DEFAULT 'moyenne'");
    }

    public function down(): void
    {
        DB::statement("ALTER TABLE projects MODIFY COLUMN status ENUM('pending', 'in_progress', 'completed', 'cancelled') DEFAULT 'pending'");
        DB::statement("ALTER TABLE tickets MODIFY COLUMN status ENUM('open', 'in_progress', 'resolved', 'closed') DEFAULT 'open'");
        DB::statement("ALTER TABLE tickets MODIFY COLUMN priority ENUM('low', 'medium', 'high', 'urgent') DEFAULT 'medium'");
    }
};
