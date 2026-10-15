<?php

namespace App\Enums;

enum LivestreamStatusEnum: string
{
    case LIVE      = 'live';
    case UPCOMING  = 'upcoming';
    case COMPLETED = 'completed';

    /**
     * Map the YouTube `liveBroadcastContent` value (live, upcoming or none) to a status.
     */
    public static function fromLiveBroadcastContent(?string $liveBroadcastContent): self
    {
        return match ($liveBroadcastContent) {
            'live'     => self::LIVE,
            'upcoming' => self::UPCOMING,
            default    => self::COMPLETED,
        };
    }
}
