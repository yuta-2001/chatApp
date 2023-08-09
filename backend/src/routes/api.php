<?php

use App\Http\Controllers\TestController;
use App\Http\Controllers\User\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::get('/test', [TestController::class, 'test'])->name('test');

Route::get('/books', function () {
    return [
        'book1', 'book2', 'book3'
    ];
});

Route::post('/login', [AuthController::class, 'login'])->name('login');
Route::post('/logout', [AuthController::class, 'logout'])->name('logout');
Route::post("/register", [AuthController::class, "register"]);

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
