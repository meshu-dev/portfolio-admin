<!doctype html>
<html lang="en">
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <title>{{ isset($profile) ? $profile['fullname'] . ' | CV' : 'CV' }}</title>
        {{--
            Matches the CV site: same colours, name-first header, a ruled section per block and a
            dates-then-details layout for each role. DOMPDF only understands CSS 2.1, so columns are
            tables and the fonts are the built-in Helvetica and Times.
        --}}
        <style>
            @page {
                margin: 48px 56px;
            }
            body {
                margin: 0;
                font-family: 'Times', serif;
                font-size: 11pt;
                line-height: 1.5;
                color: #0c1424;
            }
            h1, h2, h3, .sans {
                font-family: 'Helvetica', sans-serif;
            }
            .soft {
                color: #4b586f;
            }
            table {
                width: 100%;
                border-collapse: collapse;
            }
            td {
                padding: 0;
                vertical-align: top;
            }
            .label-col {
                width: 150px;
                padding-right: 24px;
            }

            .profile {
                padding-bottom: 36px;
            }
            .profile h1 {
                margin: 0;
                font-size: 38pt;
                line-height: 1;
                font-weight: bold;
                letter-spacing: -1px;
            }
            .profile-intro {
                margin: 18px 0 0;
                font-size: 13pt;
                line-height: 1.55;
                color: #4b586f;
            }
            .profile-meta {
                width: auto; /* same 150px label column as Skills and the roles, so the values line up */
                margin-top: 20px;
                font-size: 10pt;
                line-height: 1.35;
            }
            .profile-meta td {
                padding: 2px 0;
            }
            .profile-meta-label {
                width: 150px;
                padding-right: 0;
                font-weight: bold;
                color: #0c1424;
            }
            .profile-meta-value {
                color: #4b586f;
            }

            .section {
                border-top: 1px solid #0c1424;
                padding-top: 16px;
                padding-bottom: 28px;
            }
            .section h2 {
                margin: 0 0 10px;
                font-size: 17pt;
                font-weight: bold;
                letter-spacing: -0.3px;
            }

            .skill-row td {
                padding: 3px 0;
            }
            .skill-name {
                font-family: 'Helvetica', sans-serif;
                font-weight: bold;
                font-size: 10.5pt;
            }

            .workexp {
                page-break-inside: avoid;
                border-bottom: 1px solid #d5dde7;
            }
            .workexp-last {
                border-bottom: 0;
            }
            .workexp td {
                padding-top: 18px;
                padding-bottom: 18px;
            }
            .workexp td.workexp-dates {
                padding-top: 22px;
                font-family: 'Helvetica', sans-serif;
                font-size: 10pt;
                line-height: 1.4;
            }
            .workexp-dates .range {
                font-weight: bold;
            }
            .workexp-current {
                color: #0b7a83;
            }
            .workexp-title {
                margin: 0;
                font-size: 14pt;
                line-height: 1.25;
                font-weight: bold;
            }
            .workexp-company {
                margin: 2px 0 0;
                font-family: 'Helvetica', sans-serif;
                font-size: 11.5pt;
                font-weight: bold;
            }
            .workexp-description {
                margin: 10px 0 0;
                color: #4b586f;
            }
            .workexp-list {
                margin: 10px 0 0;
                padding-left: 18px;
            }
            .workexp-list li {
                margin-bottom: 4px;
            }
        </style>
    </head>
    <body>
        @isset ($profile)
            <div class="profile">
                <h1>{{ $profile['fullname'] }}</h1>
                <p class="profile-intro">{{ $profile['intro'] }}</p>
                <table class="profile-meta sans">
                    @if (!empty($profile['location']))
                        <tr>
                            <td class="profile-meta-label">Location</td>
                            <td class="profile-meta-value">{{ $profile['location'] }}</td>
                        </tr>
                    @endif
                    @foreach ($profile['sites'] ?? [] as $profileSite)
                        <tr>
                            <td class="profile-meta-label">{{ $profileSite['name'] }}</td>
                            <td class="profile-meta-value">{{ preg_replace(['#^https?://(www\.)?#', '#/$#'], '', $profileSite['url']) }}</td>
                        </tr>
                    @endforeach
                </table>
            </div>
        @endisset

        @isset ($skills)
            @if (count($skills) > 0)
                <div class="section">
                    <h2>Skills</h2>
                    <table>
                        @foreach ($skills as $skillGroup)
                            <tr class="skill-row">
                                <td class="label-col skill-name">{{ $skillGroup['name'] }}</td>
                                <td class="soft">{{ collect($skillGroup['technologies'])->pluck('name')->implode(', ') }}</td>
                            </tr>
                        @endforeach
                    </table>
                </div>
            @endif
        @endisset

        @isset ($workExperiences)
            @if (count($workExperiences) > 0)
                <div class="section">
                    <h2>Work experience</h2>
                    @foreach ($workExperiences as $workExperience)
                        @php($isCurrent = empty($workExperience['end_date']))
                        <table class="workexp {{ $loop->last ? 'workexp-last' : '' }}">
                            <tr>
                                <td class="label-col workexp-dates">
                                    <div class="range {{ $isCurrent ? 'workexp-current' : '' }}">
                                        {{ date('M Y', strtotime($workExperience['start_date'])) }} &ndash;
                                        {{ $isCurrent ? 'Present' : date('M Y', strtotime($workExperience['end_date'])) }}
                                    </div>
                                    <div class="soft">{{ $workExperience['location'] }}</div>
                                </td>
                                <td>
                                    <h3 class="workexp-title">{{ $workExperience['title'] }}</h3>
                                    <p class="workexp-company">{{ $workExperience['company'] }}</p>
                                    @if (!empty($workExperience['description']))
                                        <p class="workexp-description">{{ $workExperience['description'] }}</p>
                                    @endif
                                    @if (!empty($workExperience['responsibilities']))
                                        <ul class="workexp-list">
                                            @foreach ($workExperience['responsibilities'] as $responsibility)
                                                <li>{{ $responsibility }}</li>
                                            @endforeach
                                        </ul>
                                    @endif
                                </td>
                            </tr>
                        </table>
                    @endforeach
                </div>
            @endif
        @endisset
    </body>
</html>
