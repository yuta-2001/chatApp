<?php

namespace App\UseCases\Room;

use App\Helpers\AuthHelper;

class IndexAction
{
    public function __invoke(): array
    {
        $user = AuthHelper::getLoggedUser();

        $roomWithOtherUser = $user->rooms->map(function ($room) use ($user) {
            $otherUser = $room->users->except($user->id)->first();
            return [
                'id' => $room->id,
                'other_user' => [
                    'id' => $otherUser->id,
                    'icon' => asset('storage/' . $otherUser->icon),
                    'name' => $otherUser->name,
                    'email' => $otherUser->email,
                ],
            ];
        });

        return $roomWithOtherUser->toArray();
    }
}
