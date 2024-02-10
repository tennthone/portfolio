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
     * @return array
     */

    public function getUserData($searchableFields, $requestMethod, $data): array
    {
        $query = $this->model->newQuery();

        if ($requestMethod == 'POST') {
            if (array_key_exists('search', $data) && $data['search']) {
                $query = $this->applySimpleFilter($query, $searchableFields, $data['search']);
            } elseif (array_key_exists('advancedSearch', $data) && $data['advancedSearch'] == true) {
                $query = $this->applyAdvancedFilter($query, $data);
            }

            if (array_key_exists('sort', $data) && $data['sort'] == true) {
                $query = $this->sortField($query, $data);
            }
        }

        // Clone the query for counts to avoid over written
        $validCountQuery = clone $query;
        $trashCountQuery = clone $query;
        $validCount = $validCountQuery->withoutTrashed()->count();
        $trashCount = $trashCountQuery->onlyTrashed()->count();
        // get paginated Data
        $query = $this->getPaginatedQueryData($query, $data);
        // clone query for fetching data to avoid overwritten
        $adminQuery = clone $query;
        $trashAdminQuery = clone $query;
        $admins = $adminQuery->withoutTrashed()->get();
        $trash_admins = $trashAdminQuery->onlyTrashed()->get();

        return array(
            'validCount' => $validCount,
            'trashCount' => $trashCount,
            'admins' => $admins,
            'trash_admins' => $trash_admins,
        );
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
        $query = $sortField($this->model, $data['sortBy'], $data['sortField'], $query);
        return $query;
    }

    /**
     * get user detail data according to provided model
     * @param int|null $id
     * @return Collection
     */
    public function getUserDetail($id)
    {
        if ($id == null) {
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
     * @return EloquentBuilder
     */
    protected function getPaginatedQueryData($query, $data)
    {
        $page = array_key_exists('page', $data) ? $data['page'] : 1;
        $perpage = array_key_exists('perpage', $data) ? $data['perpage'] : 6;
        $query = $query->with('roles')->whereHas('roles', function ($q) {
            $q->where('name', '!=', 'superadmin');
        });

        $applyPagination = new ApplyPagination($query);
        $data = $applyPagination($page, $perpage);
        return $data;
    }
}
