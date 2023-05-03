<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ConsultationResource extends JsonResource
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
            'status' => $this->status,
            'disease_history' => $this->disease_history,
            'current_symptoms' => $this->current_symptoms,
            'doctor_notes' => $this->doctor_notes,
            'doctor_id' => $this->doctor_id,
        ];
    }
}
