<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'tel',
        'icon',
        'company'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];

    private function friendsAsFirstUser()
    {
        return $this->belongsToMany(User::class, 'friendships', 'user_id_1', 'user_id_2');
    }

    private function friendsAsSecoundUser()
    {
        return $this->belongsToMany(User::class, 'friendships', 'user_id_2', 'user_id_1');
    }

    public function getFriendsAttribute()
    {
        if (!array_key_exists('friends', $this->relations)) {
            $friends = $this->friendsAsFirstUser->merge($this->friendsAsSecoundUser);
            $this->setRelation('friends', $friends);
        }

        return $this->getRelation('friends');
    }
}
