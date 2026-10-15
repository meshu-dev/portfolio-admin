<?php

use App\Console\Commands\ImportYouTubeLivestreams;
use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Schedule;

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote');

Schedule::command(ImportYouTubeLivestreams::class)->dailyAt('03:00')->withoutOverlapping();
