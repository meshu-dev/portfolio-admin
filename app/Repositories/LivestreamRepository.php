<?php

namespace App\Repositories;

use App\Clients\Google\Response\LivestreamResponseData;
use App\Models\Livestream;
use Illuminate\Support\Collection;

class LivestreamRepository
{
    private const int LATEST_LIMIT = 10;

    /**
     * Get the user's latest livestreams, ordered by when they started (or are scheduled to start).
     *
     * @return Collection<int, Livestream>
     */
    public function get(int $userId): Collection
    {
        return Livestream::where('user_id', $userId)
                         ->orderByRaw('COALESCE(actual_start_at, scheduled_start_at) DESC')
                         ->limit(self::LATEST_LIMIT)
                         ->get();
    }

    /**
     * Create the user's livestream, or update it if it has already been saved.
     */
    public function upsert(int $userId, LivestreamResponseData $data): Livestream
    {
        return Livestream::updateOrCreate(
            [
                'user_id'    => $userId,
                'youtube_id' => $data->id,
            ],
            [
                'title'              => $data->title,
                'description'        => $data->description,
                'url'                => $data->url,
                'thumbnail'          => $data->thumbnail,
                'status'             => $data->status,
                'scheduled_start_at' => $data->scheduledStartAt,
                'actual_start_at'    => $data->actualStartAt,
                'actual_end_at'      => $data->actualEndAt,
            ]
        );
    }
}
