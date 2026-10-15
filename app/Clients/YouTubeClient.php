<?php

namespace App\Clients;

use App\Exceptions\YouTubeApiException;
use Illuminate\Support\Facades\Http;

class YouTubeClient
{
    /**
     * Send a GET request to a YouTube Data API endpoint.
     *
     * @param array<string, mixed> $query
     * @return array<string, mixed>
     *
     * @throws YouTubeApiException
     */
    public function get(string $endpoint, array $query = []): array
    {
        $apiKey = config('services.google.youtube.api_key');

        throw_unless($apiKey, YouTubeApiException::missingApiKey());

        $response = Http::baseUrl(config('services.google.youtube.api_url'))
            ->acceptJson()
            ->get($endpoint, [...$query, 'key' => $apiKey]);

        throw_if(
            $response->failed(),
            YouTubeApiException::requestFailed(
                $response->status(),
                $response->json('error.message', 'Unknown error')
            )
        );

        return $response->json();
    }
}
