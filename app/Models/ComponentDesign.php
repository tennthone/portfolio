<?php

namespace App\Models;

use App\Helpers\GeneralHelper;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class ComponentDesign extends Model
{
    use HasFactory;

    protected $guarded = [];

    public function component() {
        return $this->belongsTo(Component::class);
    }
}
