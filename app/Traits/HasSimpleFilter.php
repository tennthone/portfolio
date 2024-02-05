<?php

namespace App\Traits;

use Exception;
use Illuminate\Database\Eloquent\Builder as EloquentBuilder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Schema;

/**
 * @param Model $model
 * @param array $fileds
 * @param array $keyword
 * @return EloquentBuilder
 */

trait HasSimpleFilter {
    public function simpleFilter(Model $model, array $fields, string $keyword) : EloquentBuilder 
    {
        $tableName = $model->getTable();
        $attributes = Schema::getColumns($model);
        $query = $model->newQuery();
        
        foreach ($fields as $field) {
            if($this->hasAttribute($tableName, $field)) {
                $query->orWhere(function ($query) use ($field, $keyword) {
                    $query->where($field, 'like', '%' . $keyword . '%');
                });
            } else {
                throw new \Exception("$field column doesn't exist in $tableName table");
            }
        }
        return $query;
    }

    protected function hasAttribute(string $tableName, string $field) 
    {
        $columns = Schema::getColumnListing($tableName);
        $result = in_array($field, $columns);
        return $result;
    }
}