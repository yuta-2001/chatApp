<?php

use App\Http\Controllers\TestController;
use App\Http\Controllers\User\AuthController;
use App\Http\Controllers\User\ChatController;
use App\Http\Controllers\User\FriendController;
use App\Http\Controllers\User\FriendRequestController;
use App\Http\Controllers\User\RoomController;
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
        'as' => 'user.',
        'controller' => UserController::class,
    ], function () {
        Route::get('/', 'index')->name('index');
        Route::get('/me', 'me')->name('me');
        Route::put('/me', 'update')->name('update');
    });

    Route::group([
        'prefix' => 'friend-requests',
        'as' => 'friendRequest.',
        'controller' => FriendRequestController::class,
    ], function () {
        Route::get('/received-list', 'receivedList')->name('receivedList');
        Route::post('/', 'store')->name('store');
        Route::put('/', 'update')->name('update');
    });

    Route::group([
        'prefix' => 'friends',
        'as' => 'friend.',
        'controller' => FriendController::class,
    ], function () {
        Route::get('/', 'index')->name('index');
        Route::get('/{id}', 'show')->name('show');
    });

    Route::group([
        'prefix' => 'rooms',
        'as' => 'room.',
        'controller' => RoomController::class,
    ], function() {
        Route::get('/', 'index')->name('index');
    });

    Route::group([
        'prefix' => 'chats',
        'as' => 'chat.',
        'controller' => ChatController::class,
    ], function () {
        Route::post('/message', 'message')->name('message');
    });
});

