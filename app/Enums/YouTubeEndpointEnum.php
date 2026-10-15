<?php

namespace App\Enums;

enum YouTubeEndpointEnum: string
{
    case CHANNELS       = 'channels';
    case PLAYLIST_ITEMS = 'playlistItems';
    case VIDEOS         = 'videos';
}
