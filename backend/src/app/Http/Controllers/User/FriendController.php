<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use App\UseCases\Friend\IndexAction;
use App\UseCases\Friend\ShowAction;
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

    /**
     * @OA\Get(
     *   path="/api/friends/{id}",
     *   tags={"Friend"},
     *   summary="Get friend",
     *   description="Get friend",
     *   security={{"bearerAuth":{}}},
     *   @OA\Parameter(
     *     name="id",
     *     in="path",
     *     required=true,
     *     description="Friend ID",
     *     @OA\Schema(
     *       type="integer",
     *       format="int64",
     *       example="1"
     *     )
     *   ),
     *   @OA\Response(
     *     response=200,
     *     description="OK",
     *     @OA\JsonContent(ref="#/components/schemas/UserResource")
     *   ),
     * )
     */
    public function show(int $id, ShowAction $action)
    {
        return new UserResource($action($id));
    }
}
