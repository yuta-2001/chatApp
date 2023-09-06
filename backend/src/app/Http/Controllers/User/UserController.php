<?php

namespace App\Http\Controllers\User;

use App\Helpers\AuthHelper;
use App\Http\Controllers\Controller;
use App\Http\Requests\User\UpdateRequest;
use App\Http\Resources\UserResource;
use App\UseCases\User\UpdateAction;
use App\UseCases\User\IndexAction;
use Illuminate\Http\Request;

class UserController extends Controller
{
    /**
     * @OA\Get(
     *   path="/api/users",
     *   tags={"User"},
     *   summary="search user",
     *   description="search user",
     *   security={{"bearerAuth":{}}},
     *   @OA\Parameter(
     *     name="email",
     *     in="query",
     *     description="email",
     *     required=true,
     *     @OA\Schema(
     *       type="string"
     *     )
     *   ),
     *   @OA\Response(
     *     response=200,
     *     description="OK",
     *     @OA\JsonContent(ref="#/components/schemas/UserResource")
     *   )
     * )
     */
    public function index(Request $request, IndexAction $action): ?UserResource
    {
        $email = $request->query('email');
        $user = $action($email);
        if (!$user) {
            return null;
        }

        return new UserResource($action($email));
    }

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
     *     @OA\JsonContent(ref="#/components/schemas/UserResource")
     *   )
     * )
     */
    public function me() {
        $loggedUser = AuthHelper::getLoggedUser();
        return new UserResource($loggedUser);
    }


    /**
     * @OA\Put(
     *   path="/api/users/me",
     *   tags={"User"},
     *   summary="Update current user",
     *   description="Update current user",
     *   security={{"bearerAuth":{}}},
     *   @OA\RequestBody(
     *     @OA\JsonContent(
     *       @OA\Property(
     *         property="email",
     *         type="string",
     *         example="test@test.com"
     *       ),
     *       @OA\Property(
     *         property="current_password",
     *         type="string",
     *         example="11111111"
     *       ),
     *      @OA\Property(
     *        property="new_password",
     *        type="string",
     *        example="22222222"
     *      ),
     *      @OA\Property(
     *        property="name",
     *        type="string",
     *        example="test"
     *       ),
     *       @OA\Property(
     *         property="tel",
     *         type="string",
     *         example="090-1111-2222"
     *       ),
     *       @OA\Property(
     *         property="company",
     *         type="string",
     *         example="test company"
     *       )
     *     )
     *   ),
     *   @OA\Response(
     *     response=200,
     *     description="OK",
     *   )
     * )
     * 
     */
    public function update(UpdateRequest $request, UpdateAction $action) {
        $data = $request->only('email', 'new_password', 'name', 'tel', 'company');
        $action($request->file('icon'), $data);
    }
}
