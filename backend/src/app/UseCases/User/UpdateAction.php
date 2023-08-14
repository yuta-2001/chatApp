<?php

namespace App\UseCases\User;

use App\Helpers\AuthHelper;
use Hash;

class UpdateAction
{
    public function __invoke(array $data): void
    {
        if ($data['new_password']) {
            $data['password'] = Hash::make($data['new_password']);
        }
        unset($data['new_password']);
        AuthHelper::getLoggedUser()->update($data);
    }
}
