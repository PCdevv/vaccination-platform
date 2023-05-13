<?php

namespace App\Http\Resources;

use App\Models\SpotVaccine;
use App\Models\Vaccine;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Arr;

class SpotResource extends JsonResource
{
    // public static $wrap = 'consultation';
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        // return parent::toArray($request);
        return [
            'id' => $this->id,
            'name' => $this->name,
            'address' => $this->address,
            'serve' => $this->serve,
            'capacity' => $this->capacity,
            'available_vaccines' => call_user_func(function(){
                $vaccines = Vaccine::select('name', 'id')->get();
                $spotVaccine = Arr::flatten(SpotVaccine::select('vaccine_id')->where('spot_id', $this->id)->get()->toArray());
                foreach ($vaccines as $vaccine ) {
                    $available_vaccine[$vaccine->name] = in_array($vaccine->id, $spotVaccine);
                }
                return $available_vaccine;
            })
        ];
    }
}
