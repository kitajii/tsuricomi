<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Admin\ProfileController as AdminProfileController;
use App\Http\Controllers\MapController;
use App\Http\Controllers\RecordController;
use Illuminate\Foundation\Application;
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


// ユーザー
Route::middleware(['auth:user', 'verified'])->group(function () {
    // マップ
    Route::get('/map', [MapController::class, 'map'])->name('map');
    
    // 釣果
    Route::post('/record', [RecordController::class, 'update'])->name('record.update');
    Route::get('/record/list', [RecordController::class, 'list'])->name('record.list');
    Route::get('/record/detail', [RecordController::class, 'detail'])->name('record.detail');
    Route::delete('/record', [RecordController::class, 'destroy'])->name('record.destroy');
    Route::get('record/get-icon/{id}/{file_name}/', [RecordController::class, 'getImage'])->whereNumber('id'); //釣果画像取得
    
    // プロフィール
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::post('/profile/icon-update', [ProfileController::class, 'iconUpdate'])->name('profile.icon-update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::get('profile/get-icon/{id}/{file_name}/', [ProfileController::class, 'getIcon'])->whereNumber('id'); //アイコン画像取得
});
require __DIR__.'/auth.php';

// 管理者
Route::prefix('admin')->middleware(['auth:admin', 'verified'])->name('admin.')->group(function(){
    Route::get('/map', function () {
        return Inertia::render('Admin/Map/MapPage');
    })->name('map');

    Route::get('/profile', [AdminProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [AdminProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [AdminProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::prefix('admin')->name('admin.')->group(function(){
    require __DIR__.'/admin.php';
});