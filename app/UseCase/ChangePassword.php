<?php

namespace App\UseCase;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

/**
 * update password of incoming User Model
 * @param Model $model
 * @param array $data
 * @return 
 */
class ChangePassword
{
    public function __invoke(Model $model, array $data)
    {
        $currentPassword = $data['currentPassword'];
        $newPassword = $data['newPassword'];

        // check the password 
        $checked = Hash::check($currentPassword, $model->password);
        if (!$checked) {
            throw ValidationException::withMessages([
                'current_password' => 'Password do not match'
            ]);
        }
        // update model
        $model->update([
            'password' => Hash::make($newPassword),
        ]);

        return true;
    }
}
