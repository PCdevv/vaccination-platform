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
        Schema::create('spots', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('regional_id');
            $table->string('name');
            $table->string('address');
            $table->enum('serve', [1, 2, 3]);
            $table->integer('capacity');
            $table->timestamps();
        });

        Schema::table('spots', function (Blueprint $table) {
            $table->foreign('regional_id')->references('id')->on('regionals');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('spots');
    }
};
