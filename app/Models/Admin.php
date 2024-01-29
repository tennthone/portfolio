<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Spatie\Permission\Traits\HasRoles;
use Illuminate\Foundation\Auth\User as Authenticatable;

class Admin extends Authenticatable
{
    use HasFactory, HasRoles;

    protected $fillable = ['name', 'email', 'password', 'gender', 'phone', 'address', 'social', 'isActive'];

    protected $hidden = [
        'password',
    ];

    public function image() {
        return $this->morphOne(Image::class, 'imageable');
    }

}
