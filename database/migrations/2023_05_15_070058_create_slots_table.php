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
        Schema::create('slots', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('queue')->nullable();
            $table->unsignedBigInteger('spot_id');
            $table->unsignedBigInteger('session_id');
            $table->timestamps();
        });

        Schema::table('slots', function (Blueprint $table) {
            $table->foreign('spot_id')->references('id')->on('spots');
            $table->foreign('session_id')->references('id')->on('sessions');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('slots');
    }
};
