<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class MapController extends Controller
{
    /**
     * マップ画面
     *
     * @return void
     */
    public function map()
    {
        $auth = Auth::user()->load('profile');

        $weatherList = config('const.weather');
        $windDirectionList = config('const.wind_direction');

        return Inertia::render('Map/MapPage', [
            'auth' => $auth,
            'weatherList' => $weatherList,
            'windDirectionList' => $windDirectionList,
        ]);
    }
}
