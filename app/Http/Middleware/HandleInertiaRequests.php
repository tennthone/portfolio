<?php

namespace App\Http\Middleware;

use App\Helpers\GeneralHelper;
use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): string|null
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return [
            ...parent::share($request),
            'auth' => [
                'user' => $request->user(),
                'admin' => $request->user('admin'),
            ],
            'metadata' => [
                'logo' => GeneralHelper::getGeneralSetting('logo'),
                'title' => GeneralHelper::getGeneralSetting('title'),
            ],
            'permissions' => $request->user() ? $request->user('admin')->getAllPermissions()->pluck('name')->toArray() : "",
            'flash' => [
                'success' => fn () => $request->session()->get('success'),
                'error' => fn () => $request->session()->get('error')
            ],
        ];
    }
}
