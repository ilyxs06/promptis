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
        Schema::table('files', function (Blueprint $table) {
            $table->renameColumn('file_name', 'filename');
            $table->renameColumn('file_path', 'filepath');
            $table->renameColumn('file_type', 'mimetype');
            $table->renameColumn('file_size', 'filesize');
        });

        // Add description column if not exists
        Schema::table('files', function (Blueprint $table) {
            $table->text('description')->nullable()->after('filesize');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('files', function (Blueprint $table) {
            $table->dropColumn('description');
        });

        Schema::table('files', function (Blueprint $table) {
            $table->renameColumn('filename', 'file_name');
            $table->renameColumn('filepath', 'file_path');
            $table->renameColumn('mimetype', 'file_type');
            $table->renameColumn('filesize', 'file_size');
        });
    }
};
