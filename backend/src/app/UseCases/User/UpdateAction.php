<?php

namespace App\UseCases\User;

use App\Helpers\AuthHelper;
use Hash;
use Storage;
use Illuminate\Http\UploadedFile;

class UpdateAction
{
    public function __invoke(?UploadedFile $icon, array $data): void
    {
        if (array_key_exists('new_password', $data)) {
            $data['password'] = Hash::make($data['new_password']);
            unset($data['new_password']);
        }

        $user = AuthHelper::getLoggedUser();
        if ($icon) {
            if ($user->icon) {
                Storage::delete('public/' . $user->icon);
            }
            $path = $icon->storeAs("public/user/{$user->id}/icon", $icon->getClientOriginalName());
            $storagePath = str_replace('public/', '', $path);
        
            $data['icon'] = $storagePath;
        }

        $user->update($data);
    }
}
