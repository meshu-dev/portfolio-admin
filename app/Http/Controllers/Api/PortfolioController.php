<?php

namespace App\Http\Controllers\Api;

use App\Actions\Portfolio\GetPortfolioAction;
use App\Http\Controllers\Controller;
use App\Http\Resources\{AboutResource, IntroResource, LivestreamResource, ProjectResource};
use App\Repositories\LivestreamRepository;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;

class PortfolioController extends Controller
{
    private const int LIVESTREAM_LIMIT = 9;

    public function get(GetPortfolioAction $getPortfolioAction): JsonResponse
    {
        $data = $getPortfolioAction->execute((int) Auth::id());

        return response()->json([
            'data' => [
                'intro'    => resolve(IntroResource::class, ['resource' => $data['intro']]),
                'about'    => resolve(AboutResource::class, ['resource' => $data['about']]),
                'projects' => ProjectResource::collection($data['projects']),
            ],
        ]);
    }

    public function livestreams(LivestreamRepository $livestreamRepository): JsonResponse
    {
        $livestreams = $livestreamRepository->getLatest((int) Auth::id(), self::LIVESTREAM_LIMIT);

        return response()->json([
            'data' => LivestreamResource::collection($livestreams),
        ]);
    }

    public function lastStreamed(LivestreamRepository $livestreamRepository): JsonResponse
    {
        $latestLivestream = $livestreamRepository->getLatest((int) Auth::id(), 1)->first();

        return response()->json([
            'data' => [
                'actual_end_at' => $latestLivestream?->actual_end_at,
            ],
        ]);
    }
}
