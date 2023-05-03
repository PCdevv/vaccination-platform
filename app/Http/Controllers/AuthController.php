<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

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
        ]);
        $token = $user->createToken('main')->plainTextToken;
        return response(compact('user', 'token'));
        // return $request;
    }

    public function login(LoginRequest $request)
    {
        if (Auth::attempt(['id_card_number' => $request->id_card_number, 'password' => $request->password])) {
            $user = Auth::user();
            $success['token'] =  $user->createToken('MyApp')->plainTextToken;
            $success['name'] =  $user->name;

            return $success;
        } else {
            return response(['Unauthorised.', ['error' => 'Unauthorised']]);
        }
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
