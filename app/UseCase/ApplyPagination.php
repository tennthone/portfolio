<?php

namespace App\UseCase;

use Illuminate\Database\Eloquent\Builder;

class ApplyPagination {
    private $query;

    public function __construct(Builder $query) {
        $this->query = $query;
    }

    function __invoke($page, $perpage)
    {   
        $result = $this->query->skip(($page - 1) * $perpage)->take($perpage);
        return $result;
    }
}