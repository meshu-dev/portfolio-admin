<?php

namespace App\Enums;

use UnhandledMatchError;

enum FileTypeEnum: string
{
    case WEB = 'web';
    case S3  = 's3';

    /**
     * Maps a Laravel filesystem disk name, such as config('filesystems.default'), to the type stored on a file.
     *
     * @throws UnhandledMatchError when the disk is not one the app stores files on
     */
    public static function fromDisk(string $disk): self
    {
        return match ($disk) {
            'local' => self::WEB,
            's3'    => self::S3,
        };
    }
}
