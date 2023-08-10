<?php

use App\Http\Controllers\TestController;
use App\Http\Controllers\User\AuthController;
use App\Http\Controllers\User\UserController;
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
Route::post("/register", [AuthController::class, "register"])->name("register");

Route::middleware(['auth:sanctum'])->group(function () {
    Route::post('/logout', [AuthController::class, 'logout'])->name('logout');
    Route::group([
        'prefix' => 'users',
        'as' => 'users.',
        'controller' => UserController::class,
    ], function () {
        Route::get('/me', 'me')->name('me');
    });
});
