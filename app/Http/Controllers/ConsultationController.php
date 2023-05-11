<?php

namespace App\Http\Controllers;

use App\Models\Consultation;
use App\Http\Requests\StoreConsultationRequest;
use App\Http\Requests\UpdateConsultationRequest;
use App\Http\Resources\ConsultationResource;
use App\Models\Society;
use Illuminate\Http\Request;

class ConsultationController extends Controller
{
    /**
     * Display a listing of the resource.
     */

    public function index(Request $request)
    {
        $society = Society::where('login_tokens', $request->token)->first();
        return ['consultation' => ConsultationResource::collection(
            Consultation::where('society_id', $society->id)->get()
            // Consultation::query()->orderBy('id', 'desc')->paginate(10)
        )];
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store( Request $client_request, StoreConsultationRequest $request)
    {
        $society = Society::where('login_tokens', $client_request->token)->first();
        $data = $request->validated();
        $consultation_exist = Consultation::where('society_id', $society->id)->first();
        if ($consultation_exist) {
            return response()->json(["message" => "You already request consultation"], 200);
        }
        Consultation::create([
            'society_id' => $society->id,
            'disease_history' => $data['disease_history'],
            'current_symptoms' => $data['current_symptoms']
        ]);

        return response()->json(["message" => "Request consultation sent successful"], 200);
        // return response(new ConsultationResource($consultation), 201);
        // return 'ppp';
    }

    /**
     * Display the specified resource.
     */
    public function show(Consultation $consultation)
    {
        return new  ConsultationResource($consultation);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateConsultationRequest $request, Consultation $consultation)
    {
        $data = $request->validated();
        // $consultation = Consultation::create($data);
        $consultation->update($data);

        return new ConsultationResource($consultation);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Consultation $consultation)
    {
        $consultation->delete();
        return response('', 204);
    }
}
