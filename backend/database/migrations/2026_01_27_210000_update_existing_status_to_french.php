<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        // Mettre à jour les statuts des projets existants
        DB::table('projects')->where('status', 'pending')->update(['status' => 'planifie']);
        DB::table('projects')->where('status', 'in_progress')->update(['status' => 'en_cours']);
        DB::table('projects')->where('status', 'completed')->update(['status' => 'termine']);
        DB::table('projects')->where('status', 'cancelled')->update(['status' => 'annule']);

        // Mettre à jour les statuts des tickets existants
        DB::table('tickets')->where('status', 'open')->update(['status' => 'ouvert']);
        DB::table('tickets')->where('status', 'in_progress')->update(['status' => 'en_cours']);
        DB::table('tickets')->where('status', 'resolved')->update(['status' => 'resolu']);
        DB::table('tickets')->where('status', 'closed')->update(['status' => 'ferme']);

        // Mettre à jour les priorités des tickets existants
        DB::table('tickets')->where('priority', 'low')->update(['priority' => 'basse']);
        DB::table('tickets')->where('priority', 'medium')->update(['priority' => 'moyenne']);
        DB::table('tickets')->where('priority', 'high')->update(['priority' => 'haute']);
        DB::table('tickets')->where('priority', 'urgent')->update(['priority' => 'urgente']);
    }

    public function down(): void
    {
        // Reverse
    }
};
