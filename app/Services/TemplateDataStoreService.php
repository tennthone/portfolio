<?php

namespace App\Services;

class TemplateDataStoreService {

    public static function storeData(array $data, string $modelName, int $modelId)
    {   
        $model = app("App\\Models\\$modelName");
        $relatedData = $model->find($modelId);
        $relatedData->fields()->create($data);
        return $relatedData;
    }
}