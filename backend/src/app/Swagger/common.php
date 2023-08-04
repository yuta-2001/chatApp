<?php

namespace App\Swagger;

/**
 * @OA\Info(
 *   title="ChatApp",
 *   version="1.0"
 * )
 *
 * @OA\Parameter(
 *   name="page",
 *   in="query",
 *   description="現在のページ",
 *   example=1,
 * )
 *
 * @OA\Parameter(
 *   name="per_page",
 *   in="query",
 *   description="１ページあたりに表示する件数",
 *   example=1,
 * )
 *
 * @OA\SecurityScheme(
 *   securityScheme="bearerAuth",
 *   in="header",
 *   name="bearerAuth",
 *   type="http",
 *   scheme="bearer"
 * )
 *
 * @OA\Schema(
 *   schema="PaginationMeta",
 *   @OA\Property(
 *     property="current_page",
 *     type="int",
 *     example=1
 *   ),
 *   @OA\Property(
 *     property="from",
 *     type="int",
 *     example=1
 *   ),
 *   @OA\Property(
 *     property="last_page",
 *     type="int",
 *     example=1
 *   ),
 *   @OA\Property(
 *     property="path",
 *     type="string",
 *     example="http://example.com/pagination"
 *   ),
 *   @OA\Property(
 *     property="per_page",
 *     type="int",
 *     example=10
 *   ),
 *   @OA\Property(
 *     property="to",
 *     type="int",
 *     example=10
 *   ),
 *   @OA\Property(
 *     property="total",
 *     type="int",
 *     example=10
 *   )
 * )
 *
 * @OA\Schema(
 *   schema="PaginationLinks",
 *   @OA\Property(
 *     property="current_page",
 *     type="int",
 *     example=1
 *   ),
 *   @OA\Property(
 *     property="from",
 *     type="int",
 *     example=1
 *   ),
 *   @OA\Property(
 *     property="last_page",
 *     type="int",
 *     example=1
 *   ),
 *   @OA\Property(
 *     property="path",
 *     type="string",
 *     example="http://example.com/pagination"
 *   ),
 *   @OA\Property(
 *     property="per_page",
 *     type="int",
 *     example=10
 *   ),
 *   @OA\Property(
 *     property="to",
 *     type="int",
 *     example=10
 *   ),
 *   @OA\Property(
 *     property="total",
 *     type="int",
 *     example=10
 *   )
 * )
 *
 * @OA\Schema(
 *   schema="PaginationResponse",
 *   @OA\Property(
 *     property="data",
 *     type="array",
 *     @OA\Items()
 *   ),
 *   @OA\Property(
 *     property="links",
 *     type="object",
 *     ref="#/components/schemas/PaginationLinks"
 *   ),
 *   @OA\Property(
 *     property="meta",
 *     type="object",
 *     ref="#/components/schemas/PaginationMeta"
 *   ),
 *
 * )
 *
 */
class Common
{
}
