<?php

namespace App\Clients\Google\Request;

use Spatie\LaravelData\Data;

class PlaylistItemsRequestData extends Data
{
    public const int MAX_VIDEOS = 50;

    public function __construct(
        public string $playlistId,
        public int $maxResults = self::MAX_VIDEOS,
        public string $part = 'contentDetails',
    ) {
    }
}
