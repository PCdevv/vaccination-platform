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
        Schema::create('medicals', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('spot_id');
            $table->unsignedBigInteger('user_id');
            $table->string('name');
            $table->enum('role', ['doctor', 'officer']);
            $table->timestamps();
        });

        Schema::table('medicals', function (Blueprint $table) {
            $table->foreign('spot_id')->references('id')->on('spots');
            $table->foreign('user_id')->references('id')->on('users');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('medicals');
    }
};
