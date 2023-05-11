<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Models\Regional;
use App\Models\Society;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    // public function register(RegisterRequest $request)
    // {
    //     $data = $request->validated();
    //     /** @var User $user */
    //     $user = User::create([
    //         'id_card_number' => $data['id_card_number'],
    //         'name' => $data['name'],
    //         'born_date' => $data['born_date'],
    //         'gender' => $data['gender'],
    //         'address' => $data['address'],
    //         'password' => bcrypt($data['password']),
    //         'regional_id' => $data['regional_id'],
    //     ]);
    //     $token = $user->createToken('main')->plainTextToken;
    //     return response(compact('user', 'token'));
    // }

    public function login(LoginRequest $request)
    {
        $request->validated();
        $society = Society::where('id_card_number', $request->id_card_number)->first();
        if (!$society || !Hash::check($request->password, $society->password)) {
            return response()->json([
                'message' => 'ID Card Number or Password is incorrect'
            ],401);
        } else {
            $token =  md5($society->id_card_number);
                $success['name'] =  $society->name;
                $success['born_date'] =  $society->born_date;
                $success['gender'] =  $society->gender;
                $success['address'] =  $society->address;
                $success['token'] =  $token;
                $success['regionals'] =  Regional::select('id', 'province', 'district')->where('id', $society->regional_id)->first();
                $society->update(['login_tokens'=> $token]);
            return response()->json($success);
        }
    }
    public function logout(Request $request)
    {
        $society = Society::where('login_tokens', $request->token)->first();
        if (!$society) {
            return response()->json(['message' => 'Invalid token'], 401);
            
        }
        $society->update(['login_tokens'=> null]);
        return response()->json(['message' => 'Logout success'], 200);
        // return response()->json($society);
    }
}
