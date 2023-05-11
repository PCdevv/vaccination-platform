<?php

namespace App\Http\Controllers;

use App\Http\Resources\SpotResource;
use App\Models\Society;
use App\Models\Spot;
use Illuminate\Http\Request;

class SpotController extends Controller
{
    public function index(Request $request)
    {
        $society = Society::where('login_tokens', $request->token)->first();
        return ['spots' => SpotResource::collection(
            Spot::select(
                'spots.*'
                // 'spot_vaccines.vaccine_id', 
                // 'vaccines.name as vaccine_name'
                )
            ->where('regional_id', $society->regional_id)
            // ->rightJoin('spot_vaccines', 'spot_vaccines.id', '=', 'spot_vaccines.spot_id')
            // ->leftJoin('vaccines', 'vaccines.id', '=', 'spot_vaccines.vaccine_id')
            ->get()
        )];
    }

    public function show(Spot $spot)
    {
        return new  SpotResource($spot);
    }
}
