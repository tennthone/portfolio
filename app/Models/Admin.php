<?php

namespace App\Models;

use App\Traits\HasSimpleFilter;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Spatie\Permission\Traits\HasRoles;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Database\Eloquent\SoftDeletes;

class Admin extends Authenticatable
{
    use HasFactory, HasRoles, HasSimpleFilter, SoftDeletes;

    protected $fillable = [
        'name',
        'email',
        'password',
        'gender',
        'phone',
        'address',
        'social',
        'isActive',
        'deleted_at'
    ];

    protected $hidden = [
        'password',
    ];
    protected $dates = ['deleted_at'];

    public function image()
    {
        return $this->morphOne(Image::class, 'imageable');
    }
}
