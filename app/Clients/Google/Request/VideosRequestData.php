<?php

namespace App\Clients\Google\Request;

use Spatie\LaravelData\Data;

class VideosRequestData extends Data
{
    public function __construct(
        public string $id,
        public string $part = 'snippet,liveStreamingDetails',
    ) {
    }

    /**
     * @param list<string> $videoIds
     */
    public static function fromVideoIds(array $videoIds): self
    {
        return new self(id: implode(',', $videoIds));
    }
}
