<?php

use App\Http\Controllers\v1\Backend\AuthController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Aws\Route53\Route53Client;
use Aws\Exception\AwsException;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// Route::get('/', function () {
//     return Inertia::render('Welcome', [
//         'canLogin' => Route::has('login'),
//         'canRegister' => Route::has('register'),
//         'laravelVersion' => Application::VERSION,
//         'phpVersion' => PHP_VERSION,
//     ]);
// });

// Route::get('/dashboard', function () {
//     return Inertia::render('Dashboard');
// })->middleware(['auth', 'verified'])->name('dashboard');

// Route::middleware('auth')->group(function () {
//     Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
//     Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
//     Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
// });


if(config('app.env') == 'production') {
    Route::domain('admin.tennthone.com')->group(function() {
        require __DIR__.'/admin.php';
    });
} else {
    require __DIR__.'/admin.php';
}

Route::domain('{subdomain}.tennthone.com')->group(function () {
    Route::get('/', function ($subdomain) {
        echo "this is created subdomain name $subdomain";
    });
});

Route::get('create-subdomain/{name}', function ($name) {
    $credentials = [
        'key'    => env('AWS_ACCESS_KEY_ID'),
        'secret' => env('AWS_SECRET_ACCESS_KEY'),
        'region' => env('AWS_DEFAULT_REGION')
    ];

    $route53 = new Route53Client($credentials);
    $domainName = 'tennthone.com'; // Your registered domain
    $subdomainName = $name; // The subdomain you want to create
    $ipAddress = '13.229.69.69';
    try {
        $result = $route53->changeResourceRecordSets([
            'HostedZoneId' => 'Z095610323ZGEENP8VJ9A',
            'ChangeBatch' => [
                'Changes' => [
                    [
                        'Action' => 'CREATE',
                        'ResourceRecordSet' => [
                            'Name' => $subdomainName . '.' . $domainName,
                            'Type' => 'A',
                            'TTL' => 300,
                            'ResourceRecords' => [
                                [
                                    'Value' => $ipAddress
                                ]
                            ]
                        ]
                    ]
                ]
            ]
        ]);
    
        echo "Subdomain created successfully";
    } catch (AwsException $e) {
        echo "Error: " . $e->getMessage();
    }
});


// require __DIR__.'/auth.php';
