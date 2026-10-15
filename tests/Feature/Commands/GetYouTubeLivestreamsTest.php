<?php

use App\Actions\Google\YouTube\GetLivestreamsAction;
use App\Clients\Google\Response\LivestreamResponseData;
use App\Enums\LivestreamStatusEnum;
use App\Exceptions\YouTubeApiException;
use Carbon\CarbonImmutable;
use Mockery\MockInterface;

describe('Commands\GetYouTubeLivestreams tests', function () {
    it('outputs the livestreams', function () {
        // Arrange
        $livestream = new LivestreamResponseData(
            id: 'live1',
            title: 'Coding live',
            description: '',
            url: 'https://www.youtube.com/watch?v=live1',
            thumbnail: null,
            status: LivestreamStatusEnum::LIVE,
            scheduledStartAt: null,
            actualStartAt: CarbonImmutable::parse('2026-10-15 10:00:00'),
            actualEndAt: null,
        );

        $this->mock(GetLivestreamsAction::class, function (MockInterface $mock) use ($livestream) {
            $mock->shouldReceive('execute')->once()->with('@Mesh-Pro')->andReturn([$livestream]);
        });

        // Act & Assert
        $this->artisan('app:get-youtube-livestreams', ['handle' => '@Mesh-Pro'])
            ->expectsTable(
                ['ID', 'Title', 'Status', 'Started', 'Ended', 'URL'],
                [['live1', 'Coding live', 'live', '2026-10-15 10:00:00', null, 'https://www.youtube.com/watch?v=live1']]
            )
            ->assertExitCode(0);
    });

    it('uses the configured channel when no handle is given', function () {
        // Arrange
        $this->mock(GetLivestreamsAction::class, function (MockInterface $mock) {
            $mock->shouldReceive('execute')->once()->with(null)->andReturn([]);
        });

        // Act & Assert
        $this->artisan('app:get-youtube-livestreams')
            ->expectsOutput('No livestreams found.')
            ->assertExitCode(0);
    });

    it('outputs the error and fails when the YouTube request fails', function () {
        // Arrange
        $this->mock(GetLivestreamsAction::class, function (MockInterface $mock) {
            $mock->shouldReceive('execute')->once()->andThrow(YouTubeApiException::missingApiKey());
        });

        // Act & Assert
        $this->artisan('app:get-youtube-livestreams')
            ->expectsOutput('GOOGLE_YOUTUBE_API_KEY is not set')
            ->assertExitCode(1);
    });
});
