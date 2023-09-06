<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use App\UseCases\Friend\IndexAction;
use Illuminate\Http\Request;

class FriendController extends Controller
{
    /**
     * @OA\Get(
     *   path="/api/friends",
     *   tags={"Friend"},
     *   summary="Get friend list",
     *   description="Get friend list",
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
    public function index(IndexAction $action)
    {
        return UserResource::collection($action());
    }
}
