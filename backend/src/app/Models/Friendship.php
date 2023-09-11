<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Friendship extends Model
{
    use HasFactory;

    protected $guarded = ['id'];

    public static function boot() {
        parent::boot();
        static::creating(function ($friendship) {
            $room = Room::create();
            $room->users()->attach([$friendship->user_id_1, $friendship->user_id_2]);
        });
    }
}
