<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Http\Requests\User\LoginRequest;
use App\Http\Requests\User\RegisterRequest;
use App\UseCases\Auth\LoginAction;
use App\UseCases\Auth\LogoutAction;
use App\UseCases\Auth\RegisterAction;

class AuthController extends Controller
{
    /**
     * @OA\POST(
     *   tags={"Auth"},
     *   path="/api/register",
     *   summary="ユーザー登録",
     *   @OA\RequestBody(
     *     @OA\MediaType(
     *       mediaType="multipart/form-data",
     *       @OA\Schema(
     *         type="object",
     *         @OA\Property(
     *           property="icon",
     *           type="file",
     *         ),
     *         @OA\Property(
     *           property="name",
     *           type="string",
     *           example="test"
     *         ),
     *         @OA\Property(
     *           property="email",
     *           type="string",
     *           example="test@test.com",
     *         ),
     *         @OA\Property(
     *           property="password",
     *           type="string",
     *           example="11111111",
     *         ),
     *       )
     *     )
     *  ),
     *  @OA\Response(
     *    response=200,
     *    description="OK",
     *  )
     * )
     */
    public function register(RegisterRequest $request, RegisterAction $action): void
    {
        $action($request->file('icon'), $request->input('name'), $request->input('email'), $request->input('password'));
    }

    /**
     * @OA\POST(
     *   tags={"Auth"},
     *   path="/api/login",
     *   summary="ログイン",
     *   @OA\RequestBody(
     *     @OA\JsonContent(
     *       @OA\Property(
     *         property="email",
     *         type="string",
     *         example="test@test.com"
     *       ),
     *       @OA\Property(
     *         property="password",
     *         type="string",
     *         example="11111111"
     *       ),
     *     )
     *   ),
     *   @OA\Response(
     *     response=200,
     *     description="OK",
     *     @OA\JsonContent(
     *       type="object",
     *       @OA\Property(
     *         property="access_token",
     *         type="string",
     *         example="8c7f7485cf762007514768516686bc45e168fe11f672f0093c3b5e1c29a4a5f6"
     *       ),
     *       @OA\Property(
     *         property="token_type",
     *         type="string",
     *         example="Bearer"
     *       ),
     *     )
     *   )
     * )
     */
    public function login(LoginRequest $request, LoginAction $action): \Illuminate\Http\JsonResponse
    {
        return $action($request->input('email'), $request->input('password'));
    }

    /**
     * @OA\POST(
     *   tags={"Auth"},
     *   path="/api/logout",
     *   summary="ログアウト",
     *   security={
     *     {"bearerAuth": {}}
     *   },
     *   @OA\Response(
     *     response=200,
     *     description="OK"
     *   ),    
     * )
     */
    public function logout(LogoutAction $action): void
    {
        $action();
    }
}
