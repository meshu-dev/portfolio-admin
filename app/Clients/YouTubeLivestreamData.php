<?php

namespace App\Clients;

use App\Enums\LivestreamStatusEnum;
use Carbon\CarbonImmutable;
use Spatie\LaravelData\Data;

class YouTubeLivestreamData extends Data
{
    public function __construct(
        public string $id,
        public string $title,
        public string $description,
        public string $url,
        public ?string $thumbnail,
        public LivestreamStatusEnum $status,
        public ?CarbonImmutable $scheduledStartAt,
        public ?CarbonImmutable $actualStartAt,
        public ?CarbonImmutable $actualEndAt,
    ) {
    }

    /**
     * Build from a video resource returned by the YouTube Data API `videos` endpoint.
     *
     * @param array<string, mixed> $video
     */
    public static function fromVideo(array $video): self
    {
        $details = $video['liveStreamingDetails'];

        return new self(
            id:               $video['id'],
            title:            $video['snippet']['title'],
            description:      $video['snippet']['description'] ?? '',
            url:              "https://www.youtube.com/watch?v={$video['id']}",
            thumbnail:        $video['snippet']['thumbnails']['high']['url'] ?? null,
            status:           LivestreamStatusEnum::fromLiveBroadcastContent($video['snippet']['liveBroadcastContent'] ?? null),
            scheduledStartAt: self::parseTime($details['scheduledStartTime'] ?? null),
            actualStartAt:    self::parseTime($details['actualStartTime'] ?? null),
            actualEndAt:      self::parseTime($details['actualEndTime'] ?? null),
        );
    }

    private static function parseTime(?string $time): ?CarbonImmutable
    {
        return $time ? CarbonImmutable::parse($time) : null;
    }
}
