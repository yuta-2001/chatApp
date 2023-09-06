<?php

namespace App\UseCases\Friend;

use App\Helpers\AuthHelper;

class ShowAction
{
    public function __invoke(int $id): \App\Models\User
    {
        return AuthHelper::getLoggedUser()->friends->where('id', $id)->firstOrFail();
    }
}
