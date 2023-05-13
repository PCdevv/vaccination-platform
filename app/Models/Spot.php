<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;


class Spot extends Model
{
    use HasFactory;

    public function availableVaccine(){
        return $this->hasMany(SpotVaccine::class, 'spot_id');
    }
}
