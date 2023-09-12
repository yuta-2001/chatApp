<?php

namespace App\Http\Controllers\User;

use App\Models\Room;
use App\Helpers\AuthHelper;
use App\Http\Controllers\Controller;
use App\UseCases\Friend\ShowAction;
use App\UseCases\Room\IndexAction;

class RoomController extends Controller
{
    /**
     * @OA\Get(
     *   path="/api/rooms",
     *   tags={"Room"},
     *   summary="Get rooms",
     *   description="Get rooms",
     *   security={{"bearerAuth":{}}},
     *   @OA\Response(
     *     response=200,
     *     description="Success",
     *     @OA\JsonContent(
     *       @OA\Property(
     *         property="data",
     *         type="array",
     *         @OA\Items(
     *           @OA\Property(
     *             property="id",
     *             type="integer",
     *             example="1"
     *           ),
     *           @OA\Property(
     *             property="other_user",
     *             type="object",
     *             @OA\Property(
     *               property="id",
     *               type="integer",
     *               example="2"
     *             ),
     *             @OA\Property(
     *               property="icon",
     *               type="string",
     *               example="https://placehold.jp/150x150.png"
     *             ),
     *             @OA\Property(
     *               property="name",
     *               type="string",
     *               example="test2"
     *             ),
     *             @OA\Property(
     *               property="email",
     *               type="string",
     *               example="test@test.com"
     *             ),  
     *           ),
     *         ),
     *       ),
     *     ),
     *   ),
     * ),
     * 
     */
    public function index(IndexAction $action): \Illuminate\Http\JsonResponse
    {
        return response()->json([
            'data' => $action(),
        ]);
    }

    /**
     * @OA\Get(
     *   path="/api/rooms/{id}",
     *   tags={"Room"},
     *   summary="Get room",
     *   description="Get room",
     *   security={{"bearerAuth":{}}},
     *   @OA\Parameter(
     *     name="id",
     *     description="Room id",
     *     required=true,
     *     in="path",
     *     @OA\Schema(
     *       type="integer",
     *       example="1"
     *     )
     *   ),
     *   @OA\Response(
     *     response=200,
     *     description="Ok",
     *     @OA\JsonContent(
     *       type="object",
     *       @OA\Property(
     *         property="id",
     *         type="integer",
     *         description="ID for the room",
     *         example=1
     *       ),
     *       @OA\Property(
     *         property="other_user",
     *         type="object",
     *         @OA\Property(
     *           property="id",
     *           type="integer",
     *           description="The user ID",
     *           example=8
     *         ),
     *         @OA\Property(
     *           property="icon",
     *           type="string",
     *           description="URL to the user's icon",
     *           example="http://localhost:8888/storage/user/8/icon/IMG_0239.jpg"
     *         ),
     *         @OA\Property(
     *           property="name",
     *           type="string",
     *           description="The user's name",
     *           example="test"
     *         ),
     *         @OA\Property(
     *           property="email",
     *           type="string",
     *           description="The user's email",
     *           example="test2@test.com"
     *         ),
     *       ),
     *       @OA\Property(
     *         property="messages",
     *         type="array",
     *         @OA\Items(
     *           type="object",
     *           @OA\Property(
     *             property="id",
     *             type="integer",
     *             description="The message ID",
     *             example=1
     *           ),
     *           @OA\Property(
     *             property="content",
     *             type="string",
     *             description="The message content",
     *             example="Hello"
     *           ),
     *           @OA\Property(
     *             property="user_id",
     *             type="integer",
     *             description="The user ID",
     *             example=8
     *           ),
     *           @OA\Property(
     *             property="created_at",
     *             type="string",
     *             description="The date and time the message was created",
     *             example="2021-08-08T12:00:00.000000Z"
     *           ),
     *         )
     *       )
     *     ),
     *   ),
     * ),
     */
    public function show(int $id, ShowAction $action): \Illuminate\Http\JsonResponse
    {
        return response()->json($action($id));
    }
}
