<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ConsultationController;
use App\Http\Controllers\SpotController;
use App\Http\Controllers\VaccinationController;
use App\Http\Middleware\LoginTokenIsValid;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });
// Route::apiResource('/consultation', ConsultationController::class);

// Route::middleware(LoginTokenIsValid::class())

Route::get('/consultations', [ConsultationController::class, 'index'])->middleware(LoginTokenIsValid::class);
Route::post('/consultations', [ConsultationController::class, 'store'])->middleware(LoginTokenIsValid::class);

Route::get('/spots', [SpotController::class, 'index'])->middleware(LoginTokenIsValid::class);
Route::get('/spots/{id}', [SpotController::class, 'show'])->middleware(LoginTokenIsValid::class);

Route::get('/vaccinations', [VaccinationController::class, 'index'])->middleware(LoginTokenIsValid::class);
Route::post('/vaccinations', [VaccinationController::class, 'store'])->middleware(LoginTokenIsValid::class);

// Route::post('/auth/register', [AuthController::class, 'register']);
Route::post('/auth/login', [AuthController::class, 'login']);
Route::post('/auth/logout', [AuthController::class, 'logout']);
