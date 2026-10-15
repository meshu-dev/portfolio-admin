<?php

use App\Actions\Google\GetYouTubeLivestreamsAction;
use App\Clients\Google\Response\LivestreamResponseData;
use App\Enums\LivestreamStatusEnum;
use App\Exceptions\YouTubeApiException;

describe('GetYouTubeLivestreamsAction tests', function () {
    beforeEach(function () {
        config()->set('services.google.youtube.api_key', 'test-key');
        config()->set('services.google.youtube.channel_handle', '@Mesh-Pro');
    });

    it('returns only the livestreams from the channel uploads', function () {
        // Arrange
        Http::fake([
            '*/channels*' => Http::response([
                'items' => [['contentDetails' => ['relatedPlaylists' => ['uploads' => 'UU123']]]],
            ]),
            '*/playlistItems*' => Http::response([
                'items' => [
                    ['contentDetails' => ['videoId' => 'live1']],
                    ['contentDetails' => ['videoId' => 'past1']],
                    ['contentDetails' => ['videoId' => 'normal1']],
                ],
            ]),
            '*/videos*' => Http::response([
                'items' => [
                    [
                        'id'                   => 'live1',
                        'snippet'              => [
                            'title'                => 'Live now',
                            'description'          => 'Coding live',
                            'liveBroadcastContent' => 'live',
                            'thumbnails'           => ['high' => ['url' => 'https://img/live1.jpg']],
                        ],
                        'liveStreamingDetails' => ['actualStartTime' => '2026-10-15T10:00:00Z'],
                    ],
                    [
                        'id'                   => 'past1',
                        'snippet'              => ['title' => 'Past stream', 'liveBroadcastContent' => 'none'],
                        'liveStreamingDetails' => [
                            'actualStartTime' => '2026-10-01T10:00:00Z',
                            'actualEndTime'   => '2026-10-01T12:00:00Z',
                        ],
                    ],
                    [
                        'id'      => 'normal1',
                        'snippet' => ['title' => 'Regular upload', 'liveBroadcastContent' => 'none'],
                    ],
                ],
            ]),
        ]);

        // Act
        $livestreams = app(GetYouTubeLivestreamsAction::class)->execute();

        // Assert
        expect($livestreams)->toHaveCount(2)
            ->each->toBeInstanceOf(LivestreamResponseData::class)
            ->and($livestreams[0])->toMatchObject([
                'id'        => 'live1',
                'title'     => 'Live now',
                'url'       => 'https://www.youtube.com/watch?v=live1',
                'thumbnail' => 'https://img/live1.jpg',
                'status'    => LivestreamStatusEnum::LIVE,
                'actualEndAt' => null,
            ])
            ->and($livestreams[0]->actualStartAt->toIso8601ZuluString())->toBe('2026-10-15T10:00:00Z')
            ->and($livestreams[1]->status)->toBe(LivestreamStatusEnum::COMPLETED)
            ->and($livestreams[1]->actualEndAt->toIso8601ZuluString())->toBe('2026-10-01T12:00:00Z');

        Http::assertSent(fn ($request) => str_contains($request->url(), 'forHandle=%40Mesh-Pro'));
    });

    it('returns an empty list when the channel has no uploads', function () {
        // Arrange
        Http::fake([
            '*/channels*'      => Http::response([
                'items' => [['contentDetails' => ['relatedPlaylists' => ['uploads' => 'UU123']]]],
            ]),
            '*/playlistItems*' => Http::response(['items' => []]),
        ]);

        // Act & Assert
        expect(app(GetYouTubeLivestreamsAction::class)->execute())->toBe([]);
    });

    it('throws when the channel cannot be found', function () {
        // Arrange
        Http::fake(['*/channels*' => Http::response(['items' => []])]);

        // Act & Assert
        expect(fn () => app(GetYouTubeLivestreamsAction::class)->execute('@Missing'))
            ->toThrow(YouTubeApiException::class, 'YouTube channel @Missing could not be found');
    });
});
