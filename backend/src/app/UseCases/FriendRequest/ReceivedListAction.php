<?php

namespace App\UseCases\FriendRequest;

use App\Helpers\AuthHelper;
use App\Models\FriendRequest;

class ReceivedListAction
{
    public function __invoke()
    {
        $requests =  FriendRequest::with('requester')
            ->where('requested_id', AuthHelper::getLoggedUser()->id)
            ->where('status', FriendRequest::STATUS_PENDING)
            ->get();

        return $requests->map(function ($request) {
            return $request->requester;
        });
    }
}
