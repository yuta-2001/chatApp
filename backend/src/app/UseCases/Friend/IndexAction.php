<?php

namespace App\UseCases\Friend;

use App\Helpers\AuthHelper;

class IndexAction
{
    public function __invoke(): \Illuminate\Database\Eloquent\Collection
    {
        return AuthHelper::getLoggedUser()->friends;
    }
}
