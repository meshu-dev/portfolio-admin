<?php

use App\Enums\LivestreamStatusEnum;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class () extends Migration {
    public function up(): void
    {
        Schema::create('livestreams', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->unsignedBigInteger('user_id');
            $table->string('youtube_id');
            $table->string('title');
            $table->text('description');
            $table->string('url');
            $table->string('thumbnail')->nullable();
            $table->enum('status', LivestreamStatusEnum::cases());
            $table->timestamp('scheduled_start_at')->nullable();
            $table->timestamp('actual_start_at')->nullable();
            $table->timestamp('actual_end_at')->nullable();
            $table->timestamps();

            $table->unique(['user_id', 'youtube_id']);
            $table->foreign('user_id')->references('id')->on('users');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('livestreams');
    }
};
