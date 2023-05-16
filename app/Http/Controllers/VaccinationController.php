<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreVaccinationRequest;
use App\Models\Consultation;
use App\Models\Medical;
use App\Models\Regional;
use App\Models\Society;
use App\Models\Spot;
use App\Models\Vaccination;
use App\Models\Vaccine;
use Illuminate\Http\Request;

class VaccinationController extends Controller
{
    // public function index(Request $request){
    //     $society = Society::where('login_tokens', $request->token)->first();
    //     $vaccinations = Vaccination::where('society_id', $society->id)->first();
    //     $spot = Spot::select('id', 'name', 'address', 'serve', 'capacity', 'regional_id')->where('id', $vaccinations->spot_id)->first();
    //     $regional = Regional::select('id', 'province', 'district')->where('id', $spot->regional_id)->first();
    //     $vaccine = Vaccine::where('id', $vaccinations->vacine_id)->first();
    //     $doctor = Medical::where('id', $vaccinations->doctor_id)->first();

    //     $success['dose'] = $vaccinations->dose;
    //     $success['vaccinaation_date'] = $vaccinations->date;
    //     $spot['regional'] = $regional;
    //     $success['spot'] = $spot;
    //     // $success['spot'] = unset($spot['regional_id']);
    //     if ($vaccine = null) {
    //         $success['status'] = "undone";
    //     } else {
    //         $success['status'] = "undone";
    //     }
    //     $success['vaccine'] = $vaccine;
    //     $success['vaccinator'] = $doctor;

    //     return response()->json($success, 200);

    // }

    public function index(Request $request) {
        $society = Society::where('login_tokens', $request->token)->first();
        $vaccinations = Vaccination::where('society_id', $society->id)
                                    ->orderBy('date', 'asc')
                                    ->limit(2)
                                    ->get();
        $vaccinationsData = [];
        foreach ($vaccinations as $key => $vaccination) {
            $spot = Spot::select('id', 'name', 'address', 'serve', 'capacity', 'regional_id')
                        ->where('id', $vaccination->spot_id)
                        ->first();
            $regional = Regional::select('id', 'province', 'district')
                                ->where('id', $spot->regional_id)
                                ->first();
            $vaccine = Vaccine::where('id', $vaccination->vacine_id)->first();
            $doctor = Medical::where('id', $vaccination->doctor_id)->first();
            $vaccinationData = [
                'queue' => $vaccination->queue,
                'dose' => $vaccination->dose,
                'vaccination_date' => $vaccination->date,
                'spot' => [
                    'id' => $spot->id,
                    'name' => $spot->name,
                    'address' => $spot->address,
                    'serve' => $spot->serve,
                    'capacity' => $spot->capacity,
                    'regional' => [
                        'id' => $regional->id,
                        'province' => $regional->province,
                        'district' => $regional->district,
                    ],
                ],
                'status' => $vaccination->status == 1 ? 'done' : 'undone',
                'vaccine' => $vaccine,
                'vaccinator' => $doctor,
            ];
            $vaccinationsData[$key == 0 ? 'first' : 'second'] = $vaccinationData;
        }
        if (count($vaccinations) == 1) {
            $vaccinationsData['second'] = null;
        }
        $response = [
            'vaccinations' => $vaccinationsData,
        ];
        return response()->json($response, 200);
    }


    public function store(Request $request, StoreVaccinationRequest $vaccinationRequest){
        $validatedRequest = $vaccinationRequest->validated();
        $society = Society::where('login_tokens', $request->token)->first();
        $consultation = Consultation::where('society_id', $society->id)->first();
        $vaccinations = Vaccination::where('society_id', $society->id)->latest()->first();
        $vaccinationQueue = Vaccination::where([
                ['session_id', $request->session_id],
                ['queue', $request->queue],
                ['date', $request->date]
            ])
            ->exists();

        if ($vaccinationQueue) {
            return response()->json(['message' => 'Somebody has booked this queue'], 200);
        }

        $vaccineDose = '';
        if ($vaccinations == null) {
            $vaccineDose = 1;
        } else if (isset($vaccinations['dose']) == 1) {
            $vaccineDose = 2;
        }

        if (isset($vaccinations)) {
            if ($vaccinations->dose == 2) {
                return response()->json(["message" => "Society has been 2x vaccinated"], 401);
            }
            $dif = date_diff(date_create($vaccinations['date']), date_create($request->date));
            if ( intval($dif->format('%R%a')) < 30) {
                return response()->json(["message" => "Wait at least +30 days from 1st Vaccination"], 401);
            }
        }

        if ($consultation['status'] == 'accepted') {
            Vaccination::create([
                'dose' => $vaccineDose,
                'date' => $validatedRequest['date'],
                'queue' => $validatedRequest['queue'],
                'session_id' => $validatedRequest['session_id'],
                'society_id' => $society['id'],
                'spot_id' => $validatedRequest['spot_id']
            ]);

            if ($vaccineDose == 1) {
                return response()->json(["message" => "First vaccination registered successful"], 200);
            } else {
                return response()->json(["message" => "Second vaccination registered successful"], 200);
            }
        }
        return response()->json(["message" => "Your consultation must be accepted by doctor before"], 401);

        return response()->json([$vaccinations['dose']]);
    }
}
