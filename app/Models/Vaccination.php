<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Vaccination extends Model
{
    use HasFactory;

    protected $fillable = [
        'dose',
        'date',
        'queue',
        'session_id',
        'society_id',
        'spot_id',
        'vaccine_id'
    ];
}
