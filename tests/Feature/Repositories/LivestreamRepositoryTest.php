<?php

use App\Clients\Google\Response\LivestreamResponseData;
use App\Enums\LivestreamStatusEnum;
use App\Models\Livestream;
use App\Models\User;
use App\Repositories\LivestreamRepository;
use Carbon\CarbonImmutable;

describe('LivestreamRepository tests', function () {
    beforeEach(function () {
        $this->user = User::factory()->create();

        $this->makeData = fn (array $overrides = []) => new LivestreamResponseData(...[
            'id'               => 'abc123',
            'title'            => 'Coding live',
            'description'      => 'A coding session',
            'url'              => 'https://www.youtube.com/watch?v=abc123',
            'thumbnail'        => 'https://i.ytimg.com/vi/abc123/hqdefault.jpg',
            'status'           => LivestreamStatusEnum::LIVE,
            'scheduledStartAt' => null,
            'actualStartAt'    => CarbonImmutable::parse('2026-10-15 10:00:00'),
            'actualEndAt'      => null,
            ...$overrides,
        ]);
    });

    it('creates a livestream', function () {
        // Act
        $livestream = app(LivestreamRepository::class)->upsert($this->user->id, ($this->makeData)());

        // Assert
        expect($livestream->wasRecentlyCreated)->toBeTrue()
            ->and(Livestream::where('user_id', $this->user->id)->count())->toBe(1)
            ->and($livestream->only(['user_id', 'youtube_id', 'title', 'status']))->toBe([
                'user_id'    => $this->user->id,
                'youtube_id' => 'abc123',
                'title'      => 'Coding live',
                'status'     => LivestreamStatusEnum::LIVE,
            ])
            ->and($livestream->actual_start_at->toDateTimeString())->toBe('2026-10-15 10:00:00');
    });

    it('updates an existing livestream instead of creating a duplicate', function () {
        // Arrange
        $existing = app(LivestreamRepository::class)->upsert($this->user->id, ($this->makeData)());

        // Act
        $livestream = app(LivestreamRepository::class)->upsert($this->user->id, ($this->makeData)([
            'title'     => 'Coding live (replay)',
            'status'    => LivestreamStatusEnum::COMPLETED,
            'actualEndAt' => CarbonImmutable::parse('2026-10-15 12:00:00'),
        ]));

        // Assert
        expect(Livestream::where('user_id', $this->user->id)->count())->toBe(1)
            ->and($livestream->id)->toBe($existing->id)
            ->and($livestream->wasRecentlyCreated)->toBeFalse()
            ->and($livestream->fresh()->only(['title', 'status']))->toBe([
                'title'  => 'Coding live (replay)',
                'status' => LivestreamStatusEnum::COMPLETED,
            ])
            ->and($livestream->fresh()->actual_end_at->toDateTimeString())->toBe('2026-10-15 12:00:00');
    });

    it('keeps separate livestreams for different users with the same YouTube id', function () {
        // Arrange
        $otherUser = User::factory()->create();

        // Act
        app(LivestreamRepository::class)->upsert($this->user->id, ($this->makeData)());
        app(LivestreamRepository::class)->upsert($otherUser->id, ($this->makeData)(['title' => 'Other copy']));

        // Assert
        expect(Livestream::where('youtube_id', 'abc123')->count())->toBe(2)
            ->and(Livestream::where('user_id', $this->user->id)->where('youtube_id', 'abc123')->value('title'))->toBe('Coding live');
    });

    it('gets the 10 latest completed livestreams for the user', function () {
        // Arrange
        Livestream::query()->delete();

        $otherUser = User::factory()->create();
        Livestream::factory()->for($otherUser)->create();

        $livestreams = collect(range(1, 12))->map(fn (int $daysAgo) => Livestream::factory()->for($this->user)->create([
            'actual_start_at' => now()->subDays($daysAgo),
        ]));

        // Act
        $result = app(LivestreamRepository::class)->getLatest($this->user->id);

        // Assert
        expect($result)->toHaveCount(10)
            ->and($result->pluck('id')->all())->toBe($livestreams->take(10)->pluck('id')->all())
            ->and($result->pluck('user_id')->unique()->all())->toBe([$this->user->id]);
    });

    it('only gets completed livestreams', function () {
        // Arrange
        Livestream::query()->delete();

        $completed = Livestream::factory()->for($this->user)->create();
        Livestream::factory()->for($this->user)->live()->create();
        Livestream::factory()->for($this->user)->upcoming()->create();

        // Act
        $result = app(LivestreamRepository::class)->getLatest($this->user->id);

        // Assert
        expect($result->pluck('id')->all())->toBe([$completed->id]);
    });
});
