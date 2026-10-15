<?php

namespace Database\Factories;

use App\Enums\LivestreamStatusEnum;
use App\Models\Livestream;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Livestream>
 */
class LivestreamFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $youtubeId = fake()->unique()->regexify('[A-Za-z0-9_-]{11}');
        $startedAt = fake()->dateTimeBetween('-1 year', '-1 day');

        return [
            'user_id'            => User::factory(),
            'youtube_id'         => $youtubeId,
            'title'              => fake()->sentence(),
            'description'        => fake()->paragraph(),
            'url'                => "https://www.youtube.com/watch?v={$youtubeId}",
            'thumbnail'          => "https://i.ytimg.com/vi/{$youtubeId}/hqdefault.jpg",
            'status'             => LivestreamStatusEnum::COMPLETED,
            'scheduled_start_at' => $startedAt,
            'actual_start_at'    => $startedAt,
            'actual_end_at'      => (clone $startedAt)->modify('+2 hours'),
        ];
    }

    public function live(): static
    {
        return $this->state(fn () => [
            'status'        => LivestreamStatusEnum::LIVE,
            'actual_start_at' => now()->subHour(),
            'actual_end_at' => null,
        ]);
    }

    public function upcoming(): static
    {
        return $this->state(fn () => [
            'status'             => LivestreamStatusEnum::UPCOMING,
            'scheduled_start_at' => now()->addDay(),
            'actual_start_at'    => null,
            'actual_end_at'      => null,
        ]);
    }
}
