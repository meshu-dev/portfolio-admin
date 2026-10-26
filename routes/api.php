<?php

use App\Http\Controllers\Api\{
    AuthController,
    ContactController,
    CvController,
    PortfolioController,
};
use Illuminate\Support\Facades\Route;

Route::post('auth/login', [AuthController::class, 'login'])->name('api.login');

Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/cv', [CvController::class, 'get'])->name('cv');

    Route::prefix('portfolio')->controller(PortfolioController::class)->group(function () {
        Route::get('/', 'get')->name('portfolio');
        Route::get('livestreams', 'livestreams')->name('portfolio.livestreams');
        Route::get('livestreams/latest', 'latestLivestream')->name('portfolio.livestreams.latest');
    });
});

Route::post('/contact', [ContactController::class, 'sendMessage'])->name('contact');
