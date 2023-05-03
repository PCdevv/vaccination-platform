<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class RegisterRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\Rule|array|string>
     */
    public function rules(): array
    {
        return [
            'id_card_number' => 'required|integer',
            'name' => 'required|string',
            'born_date' => 'required|string',
            'gender' => 'required|string',
            'address' => 'required|string',
            'password' => 'required',
        ];
    }
}
