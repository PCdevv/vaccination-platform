<?php

namespace App\Http\Controllers;

use App\Http\Resources\SpotResource;
use App\Models\Session;
use App\Models\Slot;
use App\Models\Society;
use App\Models\Spot;
use App\Models\Vaccination;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;

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
        $sessions = Session::all();

        // $vaccinationCount = Vaccination::where('spot_id', $spot->id)->get();
        
        $data['date'] = $request->date;
        $data['spot'] = $spot;
        $data['vaccinations_count'] = Vaccination::where('spot_id', $spot->id)->count();

        foreach ($sessions as $session) {
            $data['vaccination_slot']['session_'.$session->id] = call_user_func(function () use ($spot, $request, $session){
                $slots = Arr::flatten(Slot::select('id')->where([['session_id', '=', $session->id], ['spot_id', '=', $spot->id]])->get()->toArray());
                $used_slots = Arr::flatten(Vaccination::select('queue')->where([
                    ['session_id', '=', $session->id],
                    ['spot_id', '=', $spot->id],
                    ['date', '=', $request->date]
                    ])->get()->toArray());
                    foreach ($slots as $slot) {
                        $available_slots[] = [
                            'queue' => $slot,
                            'available' => !in_array($slot, $used_slots)
                        ];
                    }
                    return $available_slots;
            });
        }

        return response()->json($data);
    }
}
