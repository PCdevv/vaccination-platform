<?php

namespace App\Http\Controllers;

use App\Models\Consultation;
use App\Http\Requests\StoreConsultationRequest;
use App\Http\Requests\UpdateConsultationRequest;
use App\Http\Resources\ConsultationResource;

class ConsultationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return ['consultation' => ConsultationResource::collection(
            Consultation::all()
            // Consultation::query()->orderBy('id', 'desc')->paginate(10)
        )];
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreConsultationRequest $request)
    {
        $data = $request->validated();
        $consultation = Consultation::create($data);

        return response(new ConsultationResource($consultation), 201);
        // return $data;
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
