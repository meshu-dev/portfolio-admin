<?php

namespace App\Exceptions;

use Exception;

class YouTubeApiException extends Exception
{
    public static function missingApiKey(): self
    {
        return new self('GOOGLE_YOUTUBE_API_KEY is not set');
    }

    public static function channelNotFound(string $handle): self
    {
        return new self("YouTube channel {$handle} could not be found");
    }

    public static function requestFailed(int $status, string $message): self
    {
        return new self("YouTube API request failed ({$status}): {$message}");
    }
}
