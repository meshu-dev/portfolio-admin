<?php

namespace App\Console\Commands;

use App\Actions\Google\YouTube\GetLivestreamsAction;
use App\Clients\Google\Response\LivestreamResponseData;
use App\Enums\UserEnum;
use App\Exceptions\YouTubeApiException;
use App\Repositories\LivestreamRepository;
use Illuminate\Console\Command;

class ImportYouTubeLivestreams extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:import-youtube-livestreams
                            {handle? : YouTube channel handle, defaults to the configured channel}
                            {--user= : ID of the user to import the livestreams for, defaults to the admin user}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Imports the livestreams for a YouTube channel, creating or updating them, and outputs them';

    /**
     * Execute the console command.
     */
    public function handle(GetLivestreamsAction $getLivestreams, LivestreamRepository $livestreamRepository): int
    {
        $handle = $this->argument('handle');
        $userId = $this->option('user');

        try {
            $livestreams = $getLivestreams->execute(is_string($handle) ? $handle : null);
        } catch (YouTubeApiException $exception) {
            $this->error($exception->getMessage());

            return self::FAILURE;
        }

        if ($livestreams === []) {
            $this->info('No livestreams found.');

            return self::SUCCESS;
        }

        $userId = is_numeric($userId) ? (int) $userId : UserEnum::ADMIN->value;

        $created = 0;
        $updated = 0;

        foreach ($livestreams as $livestream) {
            $livestreamRepository->upsert($userId, $livestream)->wasRecentlyCreated ? $created++ : $updated++;
        }

        $this->table(
            ['ID', 'Title', 'Status', 'Started', 'Ended', 'URL'],
            array_map(fn (LivestreamResponseData $livestream) => [
                $livestream->id,
                $livestream->title,
                $livestream->status->value,
                $livestream->actualStartAt?->toDateTimeString() ?? $livestream->scheduledStartAt?->toDateTimeString(),
                $livestream->actualEndAt?->toDateTimeString(),
                $livestream->url,
            ], $livestreams)
        );

        $this->info("Imported {$created} new and {$updated} existing livestreams for user {$userId}.");

        return self::SUCCESS;
    }
}
