<?php

namespace App\Actions\Portfolio;

use App\Actions\Portfolio\{
    Intro\GetIntroAction,
    About\GetAboutAction,
    Project\GetProjectsAction,
};
use App\Repositories\LivestreamRepository;

class GetPortfolioAction
{
    /**
     * @param int $userId
     * @return array<string, mixed>
     */
    public function execute(int $userId): array
    {
        $intro    = resolve(GetIntroAction::class)->execute($userId);
        $about    = resolve(GetAboutAction::class)->execute($userId);
        $projects = resolve(GetProjectsAction::class)->execute($userId);
        $livestreams = resolve(LivestreamRepository::class)->get($userId);

        return [
            'intro'    => $intro,
            'about'    => $about,
            'projects' => $projects,
            'livestreams' => $livestreams,
        ];
    }
}
