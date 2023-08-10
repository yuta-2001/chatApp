<?php

namespace App\Helpers;

use Illuminate\Support\Facades\Auth;

class AuthHelper
{
    public static function getLoggedUser(): mixed
    {
        return Auth::user();
    }
}
