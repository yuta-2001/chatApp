<?php

namespace App\UseCases\FriendRequest;

use App\Helpers\AuthHelper;
use App\Models\friendRequest;

class StoreAction
{
    public function __invoke(int $requestedId): void
    {
        if ($requestedId === AuthHelper::getLoggedUser()->id) {
            abort(400, 'Invalid requested_id');
        }

        friendRequest::create([
            'requester_id' => AuthHelper::getLoggedUser()->id,
            'requested_id' => $requestedId,
            'status' => friendRequest::STATUS_PENDING,
        ]);
    }
}
