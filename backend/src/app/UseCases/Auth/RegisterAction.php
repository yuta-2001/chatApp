<?php

namespace App\UseCases\Auth;

use App\Models\User;
use Hash;

class RegisterAction
{
    public function __invoke(string $name, string $email, string $password): void
    {
        User::create([
            "name" => $name,
            "email" => $email,
            "password" => Hash::make($password),
        ]);
    }
}
