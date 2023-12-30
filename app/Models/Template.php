<?php

namespace App\Models;

use App\Helpers\GeneralHelper;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Template extends Model
{
    use HasFactory;

    protected $guarded = [];

    public function git_info() {
        return $this->hasOne(GitInfo::class);
    }

    public function pages() {
        return $this->hasMany(Page::class);
    }

    public function fields() {
        return $this->morphMany(Field::class, 'fieldable');
    }

    public function creator() {
        return $this->belongsTo(Admin::class, 'createdBy');
    }

    public static function getTemplateId(int $isResource) {
        $templateId = Template::where('isResource', $isResource)->latest('id')->value('templateId');
        $prefix = $isResource == 1 ? "TR" : "TW";
        if($templateId) {
            $newTemplateId = GeneralHelper::generateTemplateId($prefix, $templateId);
        } else {
            $newTemplateId = $prefix. '-'. '000001';
        }
        return $newTemplateId;
    }
}
