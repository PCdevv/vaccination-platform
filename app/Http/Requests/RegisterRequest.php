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
        'name' => 'nullable|string',
        'born_date' => 'nullable|string',
        'gender' => 'nullable|string',
        'address' => 'nullable|string',
        'password' => 'required|string',
        'regional_id' => 'nullable',
    ];
}

}
