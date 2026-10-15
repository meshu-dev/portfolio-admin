<?php

namespace App\Console\Commands;

use App\Actions\Google\YouTube\GetLivestreamsAction;
use App\Clients\Google\Response\LivestreamResponseData;
use App\Exceptions\YouTubeApiException;
use Illuminate\Console\Command;

class GetYouTubeLivestreams extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:get-youtube-livestreams {handle? : YouTube channel handle, defaults to the configured channel}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Gets the livestreams for a YouTube channel and outputs them';

    /**
     * Execute the console command.
     */
    public function handle(GetLivestreamsAction $getLivestreams): int
    {
        $handle = $this->argument('handle');

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

        return self::SUCCESS;
    }
}
