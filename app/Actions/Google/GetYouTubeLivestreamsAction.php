<?php

namespace App\Actions\Google;

use App\Clients\YouTubeClient;
use App\Clients\YouTubeLivestreamData;
use App\Exceptions\YouTubeApiException;

class GetYouTubeLivestreamsAction
{
    private const int MAX_VIDEOS = 50;

    public function __construct(private readonly YouTubeClient $client)
    {
    }

    /**
     * Get the livestreams (live, upcoming and past) for a YouTube channel, newest first.
     *
     * @return list<YouTubeLivestreamData>
     *
     * @throws YouTubeApiException
     */
    public function execute(?string $channelHandle = null): array
    {
        $channelHandle ??= config('services.google.youtube.channel_handle');

        $videoIds = $this->getRecentVideoIds($channelHandle);

        if ($videoIds === []) {
            return [];
        }

        $videos = $this->client->get('videos', [
            'part' => 'snippet,liveStreamingDetails',
            'id'   => implode(',', $videoIds),
        ])['items'] ?? [];

        $livestreams = array_filter($videos, fn (array $video) => isset($video['liveStreamingDetails']));

        return array_values(array_map(YouTubeLivestreamData::fromVideo(...), $livestreams));
    }

    /**
     * @return list<string>
     */
    private function getRecentVideoIds(string $channelHandle): array
    {
        $channel = $this->client->get('channels', [
            'part'      => 'contentDetails',
            'forHandle' => $channelHandle,
        ])['items'][0] ?? null;

        $uploadsPlaylistId = $channel['contentDetails']['relatedPlaylists']['uploads'] ?? null;

        throw_unless($uploadsPlaylistId, YouTubeApiException::channelNotFound($channelHandle));

        $items = $this->client->get('playlistItems', [
            'part'       => 'contentDetails',
            'playlistId' => $uploadsPlaylistId,
            'maxResults' => self::MAX_VIDEOS,
        ])['items'] ?? [];

        return array_column(array_column($items, 'contentDetails'), 'videoId');
    }
}
