<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Http\Requests\FriendRequest\StoreRequest;
use App\Http\Resources\UserResource;
use App\UseCases\FriendRequest\ReceivedListAction;
use App\UseCases\FriendRequest\StoreAction;
use Illuminate\Http\Request;

class FriendRequestController extends Controller
{
    /**
     * @OA\Get(
     *   path="/api/friend-requests/received-list",
     *   tags={"FriendRequest"},
     *   summary="Get received friend request list",
     *   description="Get received friend request list",
     *   security={{"bearerAuth":{}}},
     *   @OA\Response(
     *     response=200,
     *     description="OK",
     *     @OA\JsonContent(
     *       type="array",
     *       @OA\Items(ref="#/components/schemas/UserResource")
     *     )
     *   )
     * )
     */
    public function receivedList(ReceivedListAction $action)
    {
        return UserResource::collection($action());
    }

    /**
     * @OA\Post(
     *   path="/api/friend-requests",
     *   tags={"FriendRequest"},
     *   summary="Send friend request",
     *   description="Send friend request",
     *   security={{"bearerAuth":{}}},
     *   @OA\RequestBody(
     *     @OA\JsonContent(
     *       @OA\Property(
     *         property="requested_id",
     *         type="integer",
     *         example="1"
     *       )
     *     )
     *   ),
     *   @OA\Response(
     *     response=200,
     *     description="OK",
     *   )
     * )
     */
    public function store(StoreRequest $request, StoreAction $action): void
    {
        $action((int)$request->requested_id);
    }
}
