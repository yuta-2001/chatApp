<?php

namespace App\Events;

use App\Models\Message;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class SendMessage implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    // for use in chat via puhser, we need to make a public property under camel case
    public $id;
    protected $roomId;
    public $content;
    public $user_id;
    public $created_at;

    public function __construct(Message $message)
    {
        $this->id = $message->id;
        $this->roomId = $message->room_id;
        $this->user_id = $message->user_id;
        $this->content = $message->content;
        $this->created_at = $message->created_at;
    }

    public function broadcastOn(): array
    {
        return ['chat-' . $this->roomId];
    }

    public function broadcastAs(): string
    {
        return 'message';
    }
}
