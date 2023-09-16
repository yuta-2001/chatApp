<?php

namespace App\Http\Controllers\User;

use App\Events\SendMessage;
use App\Helpers\AuthHelper;
use App\Models\Message;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class ChatController extends Controller
{
    /**
     * 
     * @OA\Post(
     *   path="/api/chat/send-message",
     *   tags={"Chat"},
     *   summary="Send message",
     *   description="Send message",
     *   security={{"bearerAuth":{}}},
     *   @OA\RequestBody(
     *     required=true,
     *     description="Send message",
     *     @OA\JsonContent(
     *       required={"room_id", "content"},
     *       @OA\Property(property="room_id", type="integer", example="1"),
     *       @OA\Property(property="content", type="string", example="Hello"),
     *     ),
     *   ),
     *   @OA\Response(
     *     response=200,
     *     description="OK",
     *   ),
     * ),
     * 
     */
    public function sendMessage(Request $request): void
    {
        $message = Message::create([
            'room_id' => $request->room_id,
            'user_id' => AuthHelper::getLoggedUser()->id,
            'content' => $request->content,
        ]);
        event (new SendMessage($message));
    }
}
