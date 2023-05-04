<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function register(RegisterRequest $request)
    {
        $data = $request->validated();
        /** @var User $user */
        $user = User::create([
            'id_card_number' => $data['id_card_number'],
            'name' => $data['name'],
            'born_date' => $data['born_date'],
            'gender' => $data['gender'],
            'address' => $data['address'],
            'password' => bcrypt($data['password']),
            'regional_id' => $data['regional_id'],
        ]);
        $token = $user->createToken('main')->plainTextToken;
        return response(compact('user', 'token'));
    }

    public function login(Request $request)
    {
        $request->validate([
            'id_card_number' => 'required',
            'password' => 'required',
        ]);
        $user = User::where('id_card_number', $request->id_card_number)->first();
        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json([
                'message' => 'ID Card Number or Password is incorrect'
            ],401);
        } else {
            $token =  $user->createToken('main')->plainTextToken;
                $success['name'] =  $user->name;
                $success['born_date'] =  $user->born_date;
                $success['gender'] =  $user->gender;
                $success['address'] =  $user->address;
                $success['token'] =  $token;
                $success['regional_id'] =  $user->regional_id;
            return response()->json($success);
        }
        

            

        // if (Auth::attempt(['id_card_number' => $request->id_card_number, 'password' => $request->password])) {
        //     $user = Auth::user();
        //     $token =  $user->createToken('main')->plainTextToken;
        //     $success['name'] =  $user->name;
        //     $success['born_date'] =  $user->born_date;
        //     $success['gender'] =  $user->gender;
        //     $success['address'] =  $user->address;
        //     $success['token'] =  $token;
        //     $success['regional_id'] =  $user->regional_id;

        //     return response()->json($success);
        // } else {
        //     return response(['Unauthorised.', ['error' => 'Unauthorised']]);
        // }

        // $credentials = $request->validated();
        // if (!Auth::attempt($credentials)) {
        //     return response([
        //         'message' => 'ID Card Number or Password is incorrect'
        //     ], 404);
        // }
        // /** @var User $user */
        // $user = Auth::user();
        // $token = $user->createToken('main')->plainTextToken;
        // return response(compact('user', 'token'));
        // return $credentials;
    }
    public function logout(Request $request)
    {
        /** @var User $user */
        $user = $request->user();
        $user->currentAccessToken()->delete();
        return response('', 204);
    }
}
