<?php

namespace App\Http\Requests\User;

use App\Rules\CheckCurrentPasswordRule;
use App\Http\Requests\ApiRequest;

class UpdateRequest extends ApiRequest
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
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            'email' => ['required', 'email', 'unique:users,email,' . auth()->id()],
            'current_password' => ['sometimes'],
            'new_password' => ['sometimes'],
            'name' => ['required', 'min:3', 'max:255'],
            'tel' => ['string', 'max:255'],
            'company' => ['string', 'max:255'],
        ];
    }
}
