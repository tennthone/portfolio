<?php

namespace App\Services;

use App\Models\Field;

class TemplateDataStoreService {

    public static function storeData(array $data, string $modelName, int $modelId)
    {   
        $model = app("App\\Models\\$modelName");
        $relatedData = $model->find($modelId);
        if(!$model) return false;
        $relatedData->fields()->create($data);
        return $relatedData;
    }

    public static function updateData(array $data, int $fieldId) {
        $field = Field::find($fieldId);
        if(!$field) return false;
        $updateModel = $field->update($data);
        return $updateModel;
    }   
}