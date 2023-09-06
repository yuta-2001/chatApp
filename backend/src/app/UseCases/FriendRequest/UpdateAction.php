<?php

namespace App\UseCases\FriendRequest;

use App\Helpers\AuthHelper;
use App\Models\FriendRequest;
use App\Models\Friendship;
use DB;

class UpdateAction
{
    public function __invoke(string $action, int $requesterId): void
    {
        DB::beginTransaction();
        try {
            $friendRequest = FriendRequest::where('requester_id', $requesterId)
                ->where('requested_id', AuthHelper::getLoggedUser()->id)
                ->where('status', FriendRequest::STATUS_PENDING)
                ->firstOrFail();

            if ($action === 'accept') {
                $friendRequest->status = FriendRequest::STATUS_ACCEPTED;
                $friendRequest->save();

                // Create friendship
                Friendship::create([
                    'user_id_1' => $friendRequest->requester_id,
                    'user_id_2' => $friendRequest->requested_id,
                ]);
            } else {
                $friendRequest->status = FriendRequest::STATUS_REJECTED;
                $friendRequest->save();
            }

            DB::commit();
        } catch (\Exception $e) {
            DB::rollBack();
            throw new \Exception($e->getMessage());
        }
    }
}
