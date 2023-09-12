<?php

namespace App\UseCases\Friend;

use App\Helpers\AuthHelper;
use App\Models\Room;

class ShowAction
{
    public function __invoke(int $id): array
    {
        $room = Room::with('users')->findOrFail($id);
        $otherUser = $room->users->except(AuthHelper::getLoggedUser()->id)->first();

        $messages = $room->messages->map(function ($message) {
            return [
                'id' => $message->id,
                'content' => $message->content,
                'user_id' => $message->user_id,
                'created_at' => $message->created_at,
            ];
        });

        return [
            'id' => $room->id,
            'other_user' => [
                'id' => $otherUser->id,
                'icon' => asset('storage/' . $otherUser->icon),
                'name' => $otherUser->name,
                'email' => $otherUser->email,
            ],
            'messages' => $messages,
        ];
    }
}
