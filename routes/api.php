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
        Route::get('livestream/last-streamed', 'lastStreamed')->name('portfolio.livestream.last-streamed');
    });
});

Route::post('/contact', [ContactController::class, 'sendMessage'])->name('contact');
