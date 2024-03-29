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
        Schema::create('spot_vaccines', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('spot_id');
            $table->unsignedBigInteger('vaccine_id');
            $table->timestamps();
        });
        Schema::table('spot_vaccines', function (Blueprint $table) {
            $table->foreign('spot_id')->references('id')->on('spots');
            $table->foreign('vaccine_id')->references('id')->on('vaccines');
        
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('spot_vaccines');
    }
};
