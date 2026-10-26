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

    it('does not include livestreams in the portfolio data', function () {
        // Act
        $response = $this->get(route('portfolio'));

        // Assert
        $response->assertOk()
                 ->assertJsonStructure(['data' => ['intro', 'about', 'projects']])
                 ->assertJsonMissingPath('data.livestreams');
    });

    describe('livestreams', function () {
        it('gets the 9 latest livestreams', function () {
            // Arrange
            Livestream::query()->delete();

            $livestreams = collect(range(1, 12))->map(fn (int $daysAgo) => Livestream::factory()->create([
                'user_id'         => UserEnum::ADMIN,
                'actual_start_at' => now()->subDays($daysAgo),
            ]));

            // Act
            $response = $this->get(route('portfolio.livestreams'));

            // Assert
            $response->assertOk()
                     ->assertJsonCount(9, 'data')
                     ->assertJsonPath('data.0.title', $livestreams->first()->title)
                     ->assertJsonPath('data.0.status', 'completed')
                     ->assertJsonPath('data.0.url', $livestreams->first()->url)
                     ->assertJsonPath('data.8.title', $livestreams[8]->title)
                     ->assertJsonStructure(['data' => ['*' => [
                         'title', 'description', 'url', 'thumbnail', 'status',
                         'scheduled_start_at', 'actual_start_at', 'actual_end_at',
                     ]]]);
        });

        it('only gets completed livestreams for the signed in user', function () {
            // Arrange
            Livestream::query()->delete();

            $completed = Livestream::factory()->create(['user_id' => UserEnum::ADMIN]);
            Livestream::factory()->live()->create(['user_id' => UserEnum::ADMIN]);
            Livestream::factory()->upcoming()->create(['user_id' => UserEnum::ADMIN]);
            Livestream::factory()->create(['user_id' => UserEnum::DEMO]);

            // Act
            $response = $this->get(route('portfolio.livestreams'));

            // Assert
            $response->assertOk()
                     ->assertJsonCount(1, 'data')
                     ->assertJsonPath('data.0.title', $completed->title);
        });

        it('returns an empty list when there are no livestreams', function () {
            // Arrange
            Livestream::query()->delete();

            // Act
            $response = $this->get(route('portfolio.livestreams'));

            // Assert
            $response->assertOk()->assertExactJson(['data' => []]);
        });

        it('requires authentication', function () {
            // Arrange
            $this->app['auth']->forgetGuards();

            // Act
            $response = $this->getJson(route('portfolio.livestreams'), ['Authorization' => '']);

            // Assert
            $response->assertUnauthorized();
        });
    });

    describe('last streamed', function () {
        it('gets the end time of the latest livestream', function () {
            // Arrange
            Livestream::query()->delete();

            Livestream::factory()->create([
                'user_id'         => UserEnum::ADMIN,
                'actual_start_at' => '2026-10-01 17:00:00',
                'actual_end_at'   => '2026-10-01 19:00:00',
            ]);
            Livestream::factory()->create([
                'user_id'         => UserEnum::ADMIN,
                'actual_start_at' => '2026-10-12 17:33:00',
                'actual_end_at'   => '2026-10-12 19:45:00',
            ]);

            // Act
            $response = $this->get(route('portfolio.livestreams.latest'));

            // Assert
            $response->assertOk()
                     ->assertJsonPath('data.actual_end_at', '2026-10-12T19:45:00.000000Z')
                     ->assertJsonStructure(['data' => ['title', 'description', 'url', 'thumbnail', 'status', 'scheduled_start_at', 'actual_start_at', 'actual_end_at']]);
        });

        it('ignores live and upcoming livestreams and other users', function () {
            // Arrange
            Livestream::query()->delete();

            Livestream::factory()->create([
                'user_id'         => UserEnum::ADMIN,
                'actual_start_at' => '2026-10-01 17:00:00',
                'actual_end_at'   => '2026-10-01 19:00:00',
            ]);
            Livestream::factory()->live()->create(['user_id' => UserEnum::ADMIN]);
            Livestream::factory()->upcoming()->create(['user_id' => UserEnum::ADMIN]);
            Livestream::factory()->create([
                'user_id'         => UserEnum::DEMO,
                'actual_start_at' => '2026-10-20 17:00:00',
                'actual_end_at'   => '2026-10-20 19:00:00',
            ]);

            // Act
            $response = $this->get(route('portfolio.livestreams.latest'));

            // Assert
            $response->assertOk()
                     ->assertJsonPath('data.actual_end_at', '2026-10-01T19:00:00.000000Z');
        });

        it('returns null when nothing has been streamed yet', function () {
            // Arrange
            Livestream::query()->delete();

            // Act
            $response = $this->get(route('portfolio.livestreams.latest'));

            // Assert
            $response->assertOk()->assertExactJson(['data' => null]);
        });

        it('requires authentication', function () {
            // Arrange
            $this->app['auth']->forgetGuards();

            // Act
            $response = $this->getJson(route('portfolio.livestreams.latest'), ['Authorization' => '']);

            // Assert
            $response->assertUnauthorized();
        });
    });
});
