<?php

namespace App\Actions\Google;

use App\Clients\Google\YouTubeClient;
use App\Clients\Google\Request\{
    ChannelsRequestData,
    PlaylistItemsRequestData,
    VideosRequestData,
};
use App\Clients\Google\Response\YouTubeLivestreamData;
use App\Enums\YouTubeEndpointEnum;
use App\Exceptions\YouTubeApiException;

class GetYouTubeLivestreamsAction
{
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

        $videos = $this->client->get(
            YouTubeEndpointEnum::VIDEOS,
            VideosRequestData::fromVideoIds($videoIds)
        )['items'] ?? [];

        $livestreams = array_filter($videos, fn (array $video) => isset($video['liveStreamingDetails']));

        return array_values(array_map(YouTubeLivestreamData::fromVideo(...), $livestreams));
    }

    /**
     * @return list<string>
     */
    private function getRecentVideoIds(string $channelHandle): array
    {
        $channel = $this->client->get(
            YouTubeEndpointEnum::CHANNELS,
            new ChannelsRequestData(forHandle: $channelHandle)
        )['items'][0] ?? null;

        $uploadsPlaylistId = $channel['contentDetails']['relatedPlaylists']['uploads'] ?? null;

        throw_unless($uploadsPlaylistId, YouTubeApiException::channelNotFound($channelHandle));

        $items = $this->client->get(
            YouTubeEndpointEnum::PLAYLIST_ITEMS,
            new PlaylistItemsRequestData(playlistId: $uploadsPlaylistId)
        )['items'] ?? [];

        return array_column(array_column($items, 'contentDetails'), 'videoId');
    }
}
