<?php

use App\Enums\UserEnum;
use App\Models\{Livestream, User};
use Laravel\Sanctum\Sanctum;

describe('Api\PortfolioController tests', function () {
    beforeEach(function () {
        Sanctum::actingAs(
            User::find(UserEnum::ADMIN)
        );
    });

    it('gets portfolio data', function () {
        $response = $this->get(route('portfolio'));

        expect($response->status())
            ->toEqual(200)
            ->and($response->json())
            ->toBeArray()
            ->toHaveKey('data');
    });

    it('includes the 9 latest livestreams in the portfolio data', function () {
        // Arrange
        Livestream::query()->delete();

        $livestreams = collect(range(1, 12))->map(fn (int $daysAgo) => Livestream::factory()->create([
            'user_id'         => UserEnum::ADMIN,
            'actual_start_at' => now()->subDays($daysAgo),
        ]));

        Livestream::factory()->create(['user_id' => UserEnum::DEMO]);

        // Act
        $response = $this->get(route('portfolio'));

        // Assert
        $response->assertOk()
                 ->assertJsonCount(9, 'data.livestreams')
                 ->assertJsonPath('data.livestreams.0.title', $livestreams->first()->title)
                 ->assertJsonPath('data.livestreams.0.status', 'completed')
                 ->assertJsonPath('data.livestreams.0.url', $livestreams->first()->url)
                 ->assertJsonStructure(['data' => ['livestreams' => ['*' => [
                     'title', 'description', 'url', 'thumbnail', 'status',
                     'scheduled_start_at', 'actual_start_at', 'actual_end_at',
                 ]]]]);
    });
});
