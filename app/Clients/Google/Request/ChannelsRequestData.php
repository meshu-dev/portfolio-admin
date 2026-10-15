<?php

namespace App\Clients\Google\Request;

use Spatie\LaravelData\Data;

class ChannelsRequestData extends Data
{
    public function __construct(
        public string $forHandle,
        public string $part = 'contentDetails',
    ) {
    }
}
