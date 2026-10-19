<?php

namespace App\Repositories;

use App\Clients\Google\Response\LivestreamResponseData;
use App\Enums\LivestreamStatusEnum;
use App\Models\Livestream;
use Illuminate\Support\Collection;

class LivestreamRepository
{
    private const int LATEST_LIMIT = 10;

    /**
     * Get the user's latest completed livestreams, newest first.
     *
     * @param int $limit Maximum number of livestreams to return
     *
     * @return Collection<int, Livestream>
     */
    public function getLatest(int $userId, int $limit = self::LATEST_LIMIT): Collection
    {
        return Livestream::where('user_id', $userId)
                         ->where('status', LivestreamStatusEnum::COMPLETED)
                         ->orderByDesc('actual_start_at')
                         ->limit($limit)
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
