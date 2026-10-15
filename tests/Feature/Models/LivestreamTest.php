<?php

use App\Enums\LivestreamStatusEnum;
use App\Models\Livestream;
use App\Models\User;
use Carbon\CarbonInterface;

describe('Models\Livestream tests', function () {
    it('stores a livestream and casts its status and dates', function () {
        // Arrange & Act
        $livestream = Livestream::factory()->create();

        // Assert
        $livestream = $livestream->fresh();

        expect($livestream->status)->toBe(LivestreamStatusEnum::COMPLETED)
            ->and($livestream->actual_start_at)->toBeInstanceOf(CarbonInterface::class)
            ->and($livestream->actual_end_at)->toBeInstanceOf(CarbonInterface::class);
    });

    it('allows live and upcoming livestreams to have no end time', function () {
        // Arrange & Act
        $live = Livestream::factory()->live()->create();
        $upcoming = Livestream::factory()->upcoming()->create();

        // Assert
        expect($live->fresh())->status->toBe(LivestreamStatusEnum::LIVE)->actual_end_at->toBeNull()
            ->and($upcoming->fresh())->status->toBe(LivestreamStatusEnum::UPCOMING)->actual_start_at->toBeNull();
    });

    it('belongs to a user', function () {
        // Arrange
        $user = User::factory()->create();

        // Act
        $livestream = Livestream::factory()->for($user)->create();

        // Assert
        expect($livestream->user->is($user))->toBeTrue()
            ->and($livestream->user_id)->toBe($user->id);
    });

    it('does not allow two livestreams with the same YouTube id', function () {
        // Arrange
        Livestream::factory()->create(['youtube_id' => 'abc123']);

        // Act & Assert
        expect(fn () => Livestream::factory()->create(['youtube_id' => 'abc123']))
            ->toThrow(Illuminate\Database\UniqueConstraintViolationException::class);
    });
});
