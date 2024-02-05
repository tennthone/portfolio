<?php

namespace App\Services;

use App\Traits\HasAdvancedFilter;
use App\Traits\HasSimpleFilter;
use App\UseCase\ApplyPagination;
use App\UseCase\SortField;
use Illuminate\Database\Eloquent\Model;

class UserService
{
    use HasSimpleFilter;
    use HasAdvancedFilter;

    /**
     * @var Model $model
     */
    protected $model;

    public function __construct(Model $model)
    {
        $this->model = $model;
    }

    /**
     * @param array $searchableFields;
     * @param string $requestMethod;
     * @param array $data
     * @return Collection
     */

    public function getUserData($searchableFields, $requestMethod, $data)
    {
        $query = $this->model->newQuery();

        if ($requestMethod == 'POST') {
            if (array_key_exists('search', $data)) {
                $query = $this->simpleFilter($this->model, $searchableFields, $data['search']);
            }

            if (array_key_exists('advancedSearch', $data)) {
                $query = $this->applyAdvancedFilter($query, $data);
            }

            if (array_key_exists('sort', $data)) {
                $query = $this->sortField($query, $data);
            }
        }

        $data = $this->getQueryData($query, $data);
        return $data;
    }

    /**
     * sorting data with provided field and action
     * @param EloquentBuilder $query
     * @param array $data
     * @return EloquentBuilder
     */

    function sortField($query, $data)
    {
        $sortField = new SortField();
        $query = $sortField($this->model, $data['sortBy'], $data['field'], $query);
        return $query;
    }

    /**
     * get user detail data according to provided model
     * @param int|null $id
     * @return Collection
     */
    public function getUserDetail($id)
    {   
        if($id == null) {
            return false;
        }

        $result = $this->model->find($id);
        if ($result) {
            return $result;
        }
        return false;
    }

    /**
     * get query data with pagination
     * @param EloquentBuilder $query
     * @param array $data
     * @return Collection
     */
    protected function getQueryData($query, $data)
    {
        $page = array_key_exists('page', $data) ? $data['page'] : 1;
        $perpage = array_key_exists('perpage', $data) ? $data['perpage'] : 6;

        $query = $query->with('roles')->whereHas('roles', function ($q) {
            $q->where('name', '!=', 'superadmin');
        });

        $applyPagination = new ApplyPagination($query);
        $data = $applyPagination($page, $perpage)->get();
        return $data;
    }
}
