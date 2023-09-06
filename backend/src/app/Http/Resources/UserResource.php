<?php

namespace App\Http\Resources;

use App\Helpers\AuthHelper;
use App\Models\FriendRequest;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\File;

/**
 * @mixin \App\Models\User
 *
 * @OA\Schema()
 **/
class UserResource extends JsonResource
{
    public static $wrap = null;

    /**
     * @OA/Property(
     *   property="icon",
     *   type="string",
     *   example="http://localhost:8000/storage/user-icon.png"
     * )
     * @OA/Property(
     *   property="name",
     *   type="string",
     *   example="John Doe"
     * )
     * @OA/Property(
     *   property="email",
     *   type="string",
     *   example="test@test.com"
     * )
     * @OA/Property(
     *   property="tel",
     *   type="string",
     *   example="1234567890"
     * )
     * @OA/Property(
     *   property="company",
     *   type="string",
     *   example="ABC Company"
     * )
     * 
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $data = [];
        if (request()->routeIs('user.me')) {
            $path = storage_path('app/public/' . $this->icon);
            if (!File::exists($path)) {
                abort(404);
            }
    
            $data = [
                'icon' => asset('storage/' . $this->icon),
                'name' => $this->name,
                'email' => $this->email,
                'tel' => $this->tel,
                'company' => $this->company,
            ];
        }

        if (request()->routeIs('user.index')) {
            $data = [
                'id' => $this->id,
                'icon' => asset('storage/' . $this->icon),
                'name' => $this->name,
                'is_requested' => FriendRequest::where('requested_id', $this->id)
                    ->where('requester_id', AuthHelper::getLoggedUser()->id)
                    ->exists(),
            ];
        }

        if (request()->routeIs('friendRequest.receivedList')) {
            $data = [
                'id' => $this->id,
                'icon' => asset('storage/' . $this->icon),
                'name' => $this->name,
                'email' => $this->email,
            ];
        }

        return $data;
    }
}
