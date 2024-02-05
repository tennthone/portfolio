<?php

namespace App\Http\Controllers;

use App\Models\Admin;
use App\Traits\HasSimpleFilter;
use Illuminate\Http\Request;

class TestController extends Controller
{
    public function index()
    {
        $admin = new Admin();
        $query = $this->simpleFilter($admin, ['name', 'email', 'phone'], '09');
        return $query->get();
    }
}
