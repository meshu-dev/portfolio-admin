<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class LivestreamResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'title'              => $this->title,
            'description'        => $this->description,
            'url'                => $this->url,
            'thumbnail'          => $this->thumbnail,
            'status'             => $this->status,
            'scheduled_start_at' => $this->scheduled_start_at,
            'actual_start_at'    => $this->actual_start_at,
            'actual_end_at'      => $this->actual_end_at,
        ];
    }
}
