<?php

use App\Enums\LivestreamStatusEnum;

describe('LivestreamStatusEnum tests', function () {
    it('maps the YouTube liveBroadcastContent value to a status', function (?string $liveBroadcastContent, LivestreamStatusEnum $expected) {
        // Act
        $status = LivestreamStatusEnum::fromLiveBroadcastContent($liveBroadcastContent);

        // Assert
        expect($status)->toBe($expected);
    })->with([
        'live'                   => ['live', LivestreamStatusEnum::LIVE],
        'upcoming'               => ['upcoming', LivestreamStatusEnum::UPCOMING],
        'none (finished)'        => ['none', LivestreamStatusEnum::COMPLETED],
        'missing'                => [null, LivestreamStatusEnum::COMPLETED],
        'anything unrecognised'  => ['premiere', LivestreamStatusEnum::COMPLETED],
    ]);

    it('uses the values stored in the database', function () {
        // Act
        $values = array_map(fn (LivestreamStatusEnum $status) => $status->value, LivestreamStatusEnum::cases());

        // Assert
        expect($values)->toBe(['live', 'upcoming', 'completed']);
    });
});
