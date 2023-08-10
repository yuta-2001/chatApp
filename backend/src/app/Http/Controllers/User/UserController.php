<?php

namespace App\Http\Controllers\User;

use App\Helpers\AuthHelper;
use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;

class UserController extends Controller
{
    /**
     * @OA\Get(
     *   path="/api/users/me",
     *   tags={"User"},
     *   summary="Get current user",
     *   description="Get current user",
     *   operationId="me",
     *   security={{"bearerAuth":{}}},
     *   @OA\Response(
     *     response=200,
     *     description="OK",
     *     @OA\JsonContent(
     *       @OA\Property(
     *         property="data",
     *         type="object",
     *         @OA\Property(
     *           property="icon",
     *           type="string",
     *           example="http://localhost:8000/storage/user-icon.png"
     *         ),
     *         @OA\Property(
     *           property="name",
     *           type="string",
     *           example="John Doe"
     *         ),
     *       ),
     *     ),
     *   )
     * )
     */
    public function me() {
        $loggedUser = AuthHelper::getLoggedUser();
        return new UserResource($loggedUser);
    }
}
