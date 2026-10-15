<?php

namespace App\Repositories;

use App\Clients\Google\Response\LivestreamResponseData;
use App\Models\Livestream;

class LivestreamRepository
{
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
