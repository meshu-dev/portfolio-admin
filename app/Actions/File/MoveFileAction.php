<?php

namespace App\Actions\File;

use App\Exceptions\FileNotUploadedException;
use Illuminate\Http\File;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class MoveFileAction
{
    /**
     * @return string
     */
    public function execute(string $filename): string
    {
        throw_unless(
            Storage::disk('local')->exists($filename),
            FileNotUploadedException::class,
            'Local file does not exist'
        );

        $file = new File(storage_path('app/private') . '/' . $filename);

        $extension = pathinfo($filename, PATHINFO_EXTENSION);
        $s3Filename = Str::uuid() . ($extension ? '.' . $extension : '');

        $fileUrl = Storage::disk('s3')->putFileAs(
            'site',
            $file,
            $s3Filename,
            'public'
        );

        throw_unless(
            $fileUrl,
            FileNotUploadedException::class,
            'File could not be uploaded to S3'
        );

        return $fileUrl;
    }
}
