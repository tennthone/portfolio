<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MetaData extends Model
{
    use HasFactory;

    protected $fillable = ['page_id', 'title', 'description', 'keywords'];

    protected $table = "page_meta_data";
}
