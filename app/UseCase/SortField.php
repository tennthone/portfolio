<?php
namespace App\UseCase;

use Illuminate\Support\Facades\DB;

class SortField {
    
    /**
     * @param string $sortBy
     * @param string $field
     * @param string $table
     * @return collection 
     */

    public function __invoke($sortBy, $field, $modelName, $query)
    {
        try {
            // Check if the specified field exists in the model
            $model = app("App\\Models\\$modelName");
            if (in_array($field, $model->getFillable())) {
                $query = $query->orderBy($field, $sortBy);
                return $query;
            } else {
                return $query->orderBy('id', 'desc');
            }
        } catch (\Exception $es) {
            dd($es->getMessage());
            return [];
        }
    }
}