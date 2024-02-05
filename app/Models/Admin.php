<?php

namespace App\Models;

use App\Traits\HasSimpleFilter;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Spatie\Permission\Traits\HasRoles;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Database\Eloquent\Builder as EloquentBuilder;

class Admin extends Authenticatable
{
    use HasFactory, HasRoles, HasSimpleFilter;

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

    public function image()
    {
        return $this->morphOne(Image::class, 'imageable');
    }

    public function simpleSearch(array $fields, string $keyword)
    {   
        foreach ($fields as $field) {
            $query = $this->filter($this, $field, $keyword);
        }
        dd($query);
        return $query;
    }

    protected function hasAttribute($attribute)
    {
        // Check if the attribute exists in the model's attributes
        $checked = array_map(function($value) use($attribute) {
            if($value == $attribute) {
                return true;
            } else {
                return false;
            }
        }, $this->getFillable());
        return $checked;
    }
}
