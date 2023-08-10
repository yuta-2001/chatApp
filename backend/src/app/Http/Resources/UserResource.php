<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\File;

class UserResource extends JsonResource
{
    public static $wrap = null;

    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $path = storage_path('app/public/' . $this->icon);
        if (!File::exists($path)) {
            abort(404);
        }

        return [
            'icon' => asset('storage/' . $this->icon),
            'name' => $this->name,
        ];
    }
}
