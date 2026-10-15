<?php

use App\Clients\YouTubeClient;
use App\Exceptions\YouTubeApiException;
use Illuminate\Http\Client\Request;

describe('YouTubeClient tests', function () {
    beforeEach(function () {
        config()->set('services.google.youtube.api_key', 'test-key');
    });

    it('sends a get request with the query and api key and returns the json', function () {
        // Arrange
        Http::fake(['*/videos*' => Http::response(['items' => [['id' => 'abc']]])]);

        // Act
        $result = app(YouTubeClient::class)->get('videos', ['part' => 'snippet', 'id' => 'abc']);

        // Assert
        expect($result)->toBe(['items' => [['id' => 'abc']]]);

        Http::assertSent(fn (Request $request) => $request->method() === 'GET'
            && str_starts_with($request->url(), 'https://www.googleapis.com/youtube/v3/videos')
            && $request['part'] === 'snippet'
            && $request['id'] === 'abc'
            && $request['key'] === 'test-key');
    });

    it('throws when the API key is not set', function () {
        // Arrange
        config()->set('services.google.youtube.api_key', null);
        Http::fake();

        // Act & Assert
        expect(fn () => app(YouTubeClient::class)->get('videos'))
            ->toThrow(YouTubeApiException::class, 'GOOGLE_YOUTUBE_API_KEY is not set');

        Http::assertNothingSent();
    });

    it('throws when the YouTube API request fails', function () {
        // Arrange
        Http::fake(['*' => Http::response(['error' => ['message' => 'quotaExceeded']], 403)]);

        // Act & Assert
        expect(fn () => app(YouTubeClient::class)->get('videos'))
            ->toThrow(YouTubeApiException::class, 'YouTube API request failed (403): quotaExceeded');
    });
});
