<?php

namespace App\Http\Controllers;

use App\Http\Resources\SpotResource;
use App\Models\Society;
use App\Models\Spot;
use App\Models\Vaccination;
use Illuminate\Http\Request;

class SpotController extends Controller
{
    public function index(Request $request)
    {
        $society = Society::where('login_tokens', $request->token)->first();
        return ['spots' => SpotResource::collection(
            Spot::select('spots.*')
            ->where('regional_id', $society->regional_id)
            ->get()
        )];
    }

    public function show(Request $request, $id)
    {
        $spot = Spot::where('id', $id)->select(
            "id",
            "regional_id",
            "name",
            "address",
            "serve",
            "capacity"
            )
            ->first();
        $vaccinationCount = Vaccination::where('spot_id', $spot->id)->get();

        return response(["date" => $request->date, "spot" => $spot, "vaccinations_count"=> count($vaccinationCount)]);
    }
}
