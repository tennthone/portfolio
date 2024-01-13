<?php

namespace App\UseCase;

use App\Models\Field;

class FetchFieldData {

    public function __invoke($model, $fieldId) : array
    {
        // fetch field data 
        if($fieldId) {
            $field = Field::find($fieldId);
        }

        // Filter content fields
        $contents = $model->fields->filter(function ($item) {
            return $item->data_type == "content";
        })->toArray(); 

        // Filter design fields
        $designs = $model->fields->filter(function ($item) {
            return $item->data_type == "design";
        })->toArray();

        return [
            'field' => isset($field) ? $field : null,
            'contents' => $contents,
            'designs' => $designs,
        ];
    }
}