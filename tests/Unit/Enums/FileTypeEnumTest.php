<?php

use App\Enums\FileTypeEnum;

describe('FileTypeEnum tests', function () {
    it('maps a filesystem disk to a file type', function (string $disk, FileTypeEnum $expected) {
        // Act
        $type = FileTypeEnum::fromDisk($disk);

        // Assert
        expect($type)->toBe($expected);
    })->with([
        'local disk' => ['local', FileTypeEnum::WEB],
        's3 disk'    => ['s3', FileTypeEnum::S3],
    ]);

    it('throws for a disk the app does not store files on', function () {
        // Act
        $act = fn () => FileTypeEnum::fromDisk('ftp');

        // Assert
        expect($act)->toThrow(UnhandledMatchError::class);
    });

    it('uses the values stored in the database', function () {
        // Act
        $values = array_map(fn (FileTypeEnum $type) => $type->value, FileTypeEnum::cases());

        // Assert
        expect($values)->toBe(['web', 's3']);
    });
});
