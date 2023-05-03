<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Admin\ProfileController as AdminProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

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

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});
Route::get('profile/get-icon/{id}/{file_name}/', [ProfileController::class, 'getIcon'])->whereNumber('id'); //アイコン画像取得

// ユーザー
Route::get('/map', function () {
    $auth = Auth::user()->load('profile');
    return Inertia::render('Map', ['auth' => $auth]);
})->middleware(['auth', 'verified'])->name('map');

Route::middleware(['auth:user', 'verified'])->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::post('/profile/icon-update', [ProfileController::class, 'iconUpdate'])->name('profile.icon-update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});
require __DIR__.'/auth.php';

// 管理者
Route::prefix('admin')->middleware(['auth:admin', 'verified'])->name('admin.')->group(function(){
    Route::get('/map', function () {
        return Inertia::render('Admin/Map');
    })->name('map');

    Route::get('/profile', [AdminProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [AdminProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [AdminProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::prefix('admin')->name('admin.')->group(function(){
    require __DIR__.'/admin.php';
});