<?php

namespace App\UseCases\User;

use App\Helpers\AuthHelper;
use App\Models\User;

class IndexAction
{
    public function __invoke(string $email): ?User
    {
        $loggedUser = AuthHelper::getLoggedUser();
        $user = User::where('id', '!=', $loggedUser->id)
                ->where('email', $email)
                ->first();

        return $user;
    }
}
