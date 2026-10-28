<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\View;
use Symfony\Component\HttpFoundation\Response;

class ApplyMode
{
    private const array MODES = ['light', 'dark', 'system'];

    /**
     * Shares the mode the user picked (light, dark or system) with the page template,
     * so the first render already has the right colours.
     */
    public function handle(Request $request, Closure $next): Response
    {
        $mode = $request->cookie('mode');

        View::share('mode', in_array($mode, self::MODES, true) ? $mode : 'system');

        return $next($request);
    }
}
