<?php

namespace App\Helpers;

use App\Models\GeneralSetting;
use Illuminate\Support\Facades\Storage;

class GeneralHelper {

    /**
     * generate template id for website and resource
     * @param string $prefix
     * @param string $latestId
     * @return int
     */
    public static function generateTemplateId(string $prefix, string $latestId) : int
    {
        $numericPart = (int) substr($latestId, 3) + 1;
        $newId = $prefix . '-'. str_pad($numericPart, 6, '0', STR_PAD_LEFT);
        return $newId;   
    }

    /**
     * get generalsetting value 
     * @param string $name
     * @return string
     */
    public static function getGeneralSetting(string $name) : string
    {   
        $gs = GeneralSetting::where('name', $name)->first();
        if($gs->type == 'file') {
            return Storage::url($gs->value);
        }
        return $gs->value;
    }
}