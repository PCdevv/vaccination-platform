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
        Schema::create('consultations', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('society_id')->nullable();
            $table->unsignedBigInteger('doctor_id')->nullable();
            $table->enum('status', ['pending', 'accepted', 'rejected'])->nullable();
            $table->text('disease_history');
            $table->text('current_symptoms');
            $table->text('doctor_notes')->nullable();
            $table->timestamps();
        });

        Schema::table('consultations', function (Blueprint $table) {
            $table->foreign('doctor_id')->references('id')->on('medicals');
            $table->foreign('society_id')->references('id')->on('societies');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('consultations');
    }
};
