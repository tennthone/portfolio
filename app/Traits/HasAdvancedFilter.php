<?php

namespace App\Traits;

use Exception;
use Illuminate\Database\Eloquent\Builder as EloquentBuilder;
use Illuminate\Support\Facades\Log;

trait HasAdvancedFilter
{
    /**
     * apply filter based on provided data
     * @param EloquentBuilder $query
     * @param array $filters
     * @return EloquentBuilder
     */
    public function applyAdvancedFilter(EloquentBuilder $query, array $filters)
    {
        foreach ($filters as $key => $value) {
            $filterMethod = 'filterBy' . ucfirst($key);

            if (method_exists($this, $filterMethod) && $value != null) {
                try {
                    $query = $this->$filterMethod($query, $value);
                } catch (Exception $e) {
                    Log::error($e->getMessage());
                }
            }
        }
        return $query;
    }

    protected function filterByName(EloquentBuilder $query, $value)
    {   
        $query->where('name', 'like', '%' . $value . '%');
        return $query;
    }

    protected function filterByEmail(EloquentBuilder $query, $value)
    {
        $query->where('email', 'like', '%' . $value . '%');
        return $query;
    }

    protected function filterByPhone(EloquentBuilder $query, $value)
    {
        $query->where('phone', 'like', '%' . $value . '%');
        return $query;
    }

    protected function filterByRole(EloquentBuilder $query, $value)
    {
        $query = $query->whereHas('roles', function ($q) use ($value) {
            $q->where('name', $value);
        });
        return $query;
    }

    protected function filterByStatus(EloquentBuilder $query, $value)
    {
        $status = $value == "true" ? 1 : 0;
        $query->where('isActive', $status);
        return $query;
    }

    protected function filterByCreatedAt(EloquentBuilder $query, $dateFilters)
    {   
        if ($dateFilters['startDate'] && $dateFilters['endDate']) {
            $this->filterByDate($query, $dateFilters['startDate'], $dateFilters['endDate']);
        }

        if($dateFilters['startMonth'] && $dateFilters['endMonth']) {
            $this->filterByMonth($query, $dateFilters['startMonth'], $dateFilters['endMonth']);
        }
        
        if($dateFilters['startYear'] && $dateFilters['endYear']) {
            $this->filterByYear($query, $dateFilters['startYear'], $dateFilters['endYear']);
        }

        return $query;
    }

    protected function filterByDate(EloquentBuilder $query, $startDate, $endDate)
    {
        $startDate = date('Y-m-d', strtotime($startDate));
        $endDate = date('Y-m-d', strtotime($endDate));

        return $query->whereBetween('created_at', [$startDate, $endDate]);
    }

    protected function filterByMonth(EloquentBuilder $query, $startMonth, $endMonth)
    {
        return $query->whereMonth('created_at', '>=', $startMonth)
            ->whereMonth('created_at', '<=', $endMonth);
    }

    protected function filterByYear(EloquentBuilder $query, $startYear, $endYear)
    {
        return $query->whereYear('created_at', '>=', $startYear)
            ->whereYear('created_at', '<=', $endYear);
    }
}
