<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
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
}
