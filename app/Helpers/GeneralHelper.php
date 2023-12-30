<?php

namespace App\Helpers;

class GeneralHelper {
    public function hello() {
        return "hello world";
    }

    public static function generateTemplateId(string $prefix, string $latestId) {
        $numericPart = (int) substr($latestId, 3) + 1;
        $newId = $prefix . '-'. str_pad($numericPart, 6, '0', STR_PAD_LEFT);
        return $newId;   
    }
}