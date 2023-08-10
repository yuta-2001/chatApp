<?php

namespace App\UseCases\Auth;

use App\Models\User;
use DB;
use Hash;
use Illuminate\Http\UploadedFile;

class RegisterAction
{
    public function __invoke(UploadedFile $icon, string $name, string $email, string $password): void
    {
        DB::beginTransaction();
        try {
            $user = User::create([
                "name" => $name,
                "email" => $email,
                "password" => Hash::make($password),
            ]);
        
            $path = $icon->storeAs("public/user/{$user->id}/icon", $icon->getClientOriginalName());
            $storagePath = str_replace('public/', '', $path);
        
            $user->icon = $storagePath;
            $user->save();

            DB::commit();
        } catch (\Exception $e) {
            \Log::error($e->getMessage());
            DB::rollBack();
            throw $e;
        }
    }
}
