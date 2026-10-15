<?php

namespace App\Models;

use App\Enums\LivestreamStatusEnum;
use Database\Factories\LivestreamFactory;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Livestream extends Model
{
    /** @use HasFactory<LivestreamFactory> */
    use HasFactory;
    use HasUuids;

    protected $table = 'livestreams';

    protected $fillable = [
        'user_id',
        'youtube_id',
        'title',
        'description',
        'url',
        'thumbnail',
        'status',
        'scheduled_start_at',
        'actual_start_at',
        'actual_end_at',
    ];

    /**
     * @return BelongsTo<User, $this>
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    protected function casts(): array
    {
        return [
            'status'             => LivestreamStatusEnum::class,
            'scheduled_start_at' => 'datetime',
            'actual_start_at'    => 'datetime',
            'actual_end_at'      => 'datetime',
        ];
    }
}
