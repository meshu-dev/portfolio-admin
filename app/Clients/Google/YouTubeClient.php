<?php

namespace App\Clients\Google;

use App\Enums\YouTubeEndpointEnum;
use App\Exceptions\YouTubeApiException;
use Illuminate\Support\Facades\Http;
use Spatie\LaravelData\Data;

class YouTubeClient
{
    /**
     * Send a GET request to a YouTube Data API endpoint.
     *
     * @return array<string, mixed>
     *
     * @throws YouTubeApiException
     */
    public function get(YouTubeEndpointEnum $endpoint, Data $request): array
    {
        $apiKey = config('services.google.youtube.api_key');

        throw_unless($apiKey, YouTubeApiException::missingApiKey());

        $response = Http::baseUrl(config('services.google.youtube.api_url'))
            ->acceptJson()
            ->get($endpoint->value, [...$request->toArray(), 'key' => $apiKey]);

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
