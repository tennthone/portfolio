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

    public function __invoke($model, $sortBy, $field, $query)
    {
        try {
            // Check if the specified field exists in the model
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