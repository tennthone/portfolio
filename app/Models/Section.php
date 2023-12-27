<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Section extends Model
{
    use HasFactory;
    protected $guarded = [];

    public function pages() {
        return $this->belongsToMany(Page::class)->withPivot('position');
    }

    public function fields() {
        return $this->morphMany(Field::class, 'fieldable');
    }
}
