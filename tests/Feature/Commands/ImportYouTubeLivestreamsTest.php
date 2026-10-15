<?php

use App\Actions\Google\YouTube\GetLivestreamsAction;
use App\Clients\Google\Response\LivestreamResponseData;
use App\Enums\LivestreamStatusEnum;
use App\Enums\UserEnum;
use App\Exceptions\YouTubeApiException;
use App\Models\Livestream;
use Carbon\CarbonImmutable;
use Mockery\MockInterface;

describe('Commands\ImportYouTubeLivestreams tests', function () {
    beforeEach(function () {
        $this->makeLivestream = fn (string $title = 'Coding live', LivestreamStatusEnum $status = LivestreamStatusEnum::LIVE) => new LivestreamResponseData(
            id: 'live1',
            title: $title,
            description: '',
            url: 'https://www.youtube.com/watch?v=live1',
            thumbnail: null,
            status: $status,
            scheduledStartAt: null,
            actualStartAt: CarbonImmutable::parse('2026-10-15 10:00:00'),
            actualEndAt: null,
        );

        $this->mockLivestreams = fn (array $livestreams) => $this->mock(GetLivestreamsAction::class, function (MockInterface $mock) use ($livestreams) {
            $mock->shouldReceive('execute')->once()->with('@Mesh-Pro')->andReturn($livestreams);
        });
    });

    it('outputs the livestreams and saves them for the admin user', function () {
        // Arrange
        ($this->mockLivestreams)([($this->makeLivestream)()]);

        // Act & Assert
        $this->artisan('app:import-youtube-livestreams', ['handle' => '@Mesh-Pro'])
            ->expectsTable(
                ['ID', 'Title', 'Status', 'Started', 'Ended', 'URL'],
                [['live1', 'Coding live', 'live', '2026-10-15 10:00:00', null, 'https://www.youtube.com/watch?v=live1']]
            )
            ->expectsOutput('Imported 1 new and 0 existing livestreams for user 1.')
            ->assertExitCode(0);

        $livestream = Livestream::where('youtube_id', 'live1')->sole();

        expect($livestream->user_id)->toBe(UserEnum::ADMIN->value)
            ->and($livestream->title)->toBe('Coding live')
            ->and($livestream->status)->toBe(LivestreamStatusEnum::LIVE);
    });

    it('updates livestreams that were already imported', function () {
        // Arrange
        ($this->mockLivestreams)([($this->makeLivestream)()]);
        $this->artisan('app:import-youtube-livestreams', ['handle' => '@Mesh-Pro']);

        $this->forgetMock(GetLivestreamsAction::class);
        ($this->mockLivestreams)([($this->makeLivestream)('Coding live (replay)', LivestreamStatusEnum::COMPLETED)]);

        // Act & Assert
        $this->artisan('app:import-youtube-livestreams', ['handle' => '@Mesh-Pro'])
            ->expectsOutput('Imported 0 new and 1 existing livestreams for user 1.')
            ->assertExitCode(0);

        $livestream = Livestream::where('youtube_id', 'live1')->sole();

        expect($livestream->title)->toBe('Coding live (replay)')
            ->and($livestream->status)->toBe(LivestreamStatusEnum::COMPLETED);
    });

    it('saves the livestreams for the user given in the user option', function () {
        // Arrange
        ($this->mockLivestreams)([($this->makeLivestream)()]);

        // Act & Assert
        $this->artisan('app:import-youtube-livestreams', ['handle' => '@Mesh-Pro', '--user' => UserEnum::DEMO->value])
            ->assertExitCode(0);

        expect(Livestream::where('youtube_id', 'live1')->sole()->user_id)->toBe(UserEnum::DEMO->value);
    });

    it('uses the configured channel when no handle is given', function () {
        // Arrange
        $this->mock(GetLivestreamsAction::class, function (MockInterface $mock) {
            $mock->shouldReceive('execute')->once()->with(null)->andReturn([]);
        });

        // Act & Assert
        $this->artisan('app:import-youtube-livestreams')
            ->expectsOutput('No livestreams found.')
            ->assertExitCode(0);

        expect(Livestream::where('youtube_id', 'live1')->exists())->toBeFalse();
    });

    it('outputs the error and fails when the YouTube request fails', function () {
        // Arrange
        $this->mock(GetLivestreamsAction::class, function (MockInterface $mock) {
            $mock->shouldReceive('execute')->once()->andThrow(YouTubeApiException::missingApiKey());
        });

        // Act & Assert
        $this->artisan('app:import-youtube-livestreams')
            ->expectsOutput('GOOGLE_YOUTUBE_API_KEY is not set')
            ->assertExitCode(1);
    });
});
