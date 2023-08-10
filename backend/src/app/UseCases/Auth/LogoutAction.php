<?php

namespace App\UseCases\Auth;

use App\Helpers\AuthHelper;

class LogoutAction
{
    public function __invoke(): void
    {
        $loggedUser = AuthHelper::getLoggedUser();
        $loggedUser->tokens()->delete();
    }
}
