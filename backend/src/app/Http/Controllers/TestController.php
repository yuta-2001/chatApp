<?php

namespace App\Http\Controllers;

class TestController extends Controller
{
    /**
     * @OA\Get(
     *   path="/api/test",
     *   summary="テスト",
     *   description="テスト",
     *   operationId="test",
     *   tags={"テスト"},
     *   @OA\Response(
     *     response=200,
     *     description="OK",
     *   ),
     * )
     */
    public function test (): void
    {
    }
}
