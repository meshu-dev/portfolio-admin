<?php

use App\Enums\{DynamicValueEnum, TypeEnum};

return [
    'cv' => [
        'profile' => [
            'fullname'  => 'Alex Carter',
            'intro'     => "Full-stack developer with over " .
                            DynamicValueEnum::YEARS_WORKED->value .
                            " years of experience building web applications",
            'location'  => 'Sample City, UK',
        ],
        'skills' => [
            [
                'skill'        => ['name' => 'Backend'],
                'technologies' => ['PHP', 'MySQL', 'Node.js', 'PostgreSQL'],
            ],
            [
                'skill'        => ['name' => 'Frontend'],
                'technologies' => ['Vue.js', 'React', 'TypeScript', 'TailwindCSS'],
            ],
            [
                'skill'        => ['name' => 'Frameworks'],
                'technologies' => ['Laravel', 'Symfony', 'Next.js', 'Nuxt'],
            ],
            [
                'skill'        => ['name' => 'Misc'],
                'technologies' => ['AWS', 'Docker', 'Linux', 'PHPUnit'],
            ],
        ],
        'work_experiences' => [
            [
                'title'       => 'Senior Software Engineer',
                'company'     => 'Example Digital Ltd',
                'location'    => 'London',
                'start_date'  => '2022-02-01',
                'end_date'    => null,
                'description' => 'Building internal tools and APIs for a SaaS platform.',
                'responsibilities' => [
                    'Develop and maintain Laravel and Vue.js applications.',
                    'Design and ship REST API endpoints for customer workflows.',
                    'Collaborate in agile sprints with product and QA teams.',
                    'Write automated tests with Pest to maintain quality.',
                ],
                'active' => true,
            ],
            [
                'title'       => 'Software Developer',
                'company'     => 'Acme Solutions',
                'location'    => 'Manchester',
                'start_date'  => '2019-06-01',
                'end_date'    => '2022-01-31',
                'description' => 'Worked on customer dashboards and integration services.',
                'responsibilities' => [
                    'Implemented backend features in a custom PHP application.',
                    'Built and documented API integrations with third-party systems.',
                    'Created Angular UI components for reporting interfaces.',
                    'Improved deployment workflows and monitoring dashboards.',
                ],
                'active' => true,
            ],
            [
                'title'       => 'PHP Developer',
                'company'     => 'Northwind Systems',
                'location'    => 'Birmingham',
                'start_date'  => '2017-03-01',
                'end_date'    => '2019-05-31',
                'description' => 'Maintained and modernized legacy line-of-business software.',
                'responsibilities' => [
                    'Maintained multi-tenant PHP applications for enterprise clients.',
                    'Delivered a Laravel API to replace legacy service endpoints.',
                    'Contributed frontend support using Angular and C# services.',
                ],
                'active' => true,
            ],
            [
                'title'       => 'Web Developer',
                'company'     => 'Example Commerce',
                'location'    => 'Leeds',
                'start_date'  => '2015-01-01',
                'end_date'    => '2017-02-28',
                'description' => 'Developed and supported e-commerce and admin platform features.',
                'responsibilities' => [
                    'Shipped new checkout and order management features.',
                    'Integrated third-party payment and shipping services.',
                    'Worked in Scrum teams and participated in on-call support.',
                ],
                'active' => true,
            ],
            [
                'title'       => 'Junior Web Developer',
                'company'     => 'Starter Studio',
                'location'    => 'Remote',
                'start_date'  => '2013-06-01',
                'end_date'    => '2014-12-31',
                'description' => 'Supported client websites and small web applications.',
                'responsibilities' => [
                    'Implemented bug fixes and UI improvements for client projects.',
                    'Built reusable PHP modules and admin tools.',
                ],
                'active' => false,
            ],
        ],
    ],
    'portfolio' => [
        'intro' => [
            'line1' => "Hello, I'm Alex",
            'line2' => "I'm a software developer with " . DynamicValueEnum::YEARS_WORKED->value . " years of experience",
        ],
        'about' => [
            'text' => "<p>I am a full-stack developer focused on building maintainable products with modern web technologies.</p>" .
                      "<p>I enjoy solving practical business problems, improving developer workflows, and continuously learning new tools.</p>",
            'skills' => [
                'name' => 'Portfolio',
                'technologies' => [
                    'PHP',
                    'Laravel',
                    'Node.js',
                    'MySQL',
                    'PostgreSQL',
                    'Vue.js',
                    'React',
                    'TypeScript',
                ],
            ],
        ],
        'repositories' => [
            [
                'name' => 'Starter Portfolio',
                'url'  => 'https://github.com/example/starter-portfolio',
            ],
            [
                'name' => 'Starter API',
                'url'  => 'https://github.com/example/starter-api',
            ],
            [
                'name' => 'Learning Lab',
                'url'  => 'https://github.com/example/learning-lab',
            ],
            [
                'name' => 'UI Playground',
                'url'  => 'https://github.com/example/ui-playground',
            ],
            [
                'name' => 'CMS Adapter',
                'url'  => 'https://github.com/example/cms-adapter',
            ],
            [
                'name' => 'Analytics Service',
                'url'  => 'https://github.com/example/analytics-service',
            ],
        ],
        'projects' => [
            [
                'name'         => 'Starter Portfolio',
                'description'  => 'Personal portfolio template',
                'url'          => 'https://portfolio.example.com',
                'repositories' => [
                    'Starter Portfolio',
                    'Starter API',
                ],
                'technologies' => [
                    'React',
                    'Next.js',
                    'Laravel',
                ],
                'file' => [
                    'name' => 'cv.png',
                    'url'  => fake()->placeholderImageUrl(512, 512),
                ],
            ],
            [
                'name'         => 'Learning Lab',
                'description'  => 'Tutorial and notes platform',
                'url'          => 'https://lab.example.com',
                'repositories' => [
                    'Learning Lab',
                    'Starter API',
                ],
                'technologies' => [
                    'Astro',
                    'Laravel',
                ],
                'file' => [
                    'name' => 'learning-lab.png',
                    'url'  => fake()->placeholderImageUrl(512, 512),
                ],
            ],
        ],
    ],
    'technologies' => [
        'PHP',
        'TypeScript',
        'JavaScript',
        'Python',
        'Go',
        'Sass',
        'Symfony',
        'AWS',
        'Docker',
        'PHPUnit',
        'Redis',
        'Terraform',
        'Laravel',
        'WordPress',
        'Node.js',
        'MySQL',
        'SQLite',
        'PostgreSQL',
        'Express',
        'Fastify',
        'React',
        'Next.js',
        'Vue.js',
        'Nuxt',
        'GraphQL',
        'Linux',
        'TailwindCSS',
        'Astro',
        '.NET',
    ],
    'sites' => [
        [
            'name' => 'GitHub',
            'url'  => 'https://github.com/example',
            'icons' => ['cv' => 'simple-icons:github', 'portfolio' => 'i-simple-icons-github'],
            'types' => [
                TypeEnum::CV->value,
                TypeEnum::PORTFOLIO->value,
            ],
            'file' => [
                'name' => 'github.png',
                'url'  => fake()->placeholderImageUrl(64, 64),
            ],
        ],
        [
            'name' => 'LinkedIn',
            'url'  => 'https://www.example.com/linkedin',
            'icons' => ['cv' => 'simple-icons:linkedin', 'portfolio' => 'i-simple-icons-linkedin'],
            'types' => [
                TypeEnum::CV->value,
                TypeEnum::PORTFOLIO->value,
            ],
            'file' => [
                'name' => 'linkedin.png',
                'url'  => fake()->placeholderImageUrl(64, 64),
            ],
        ],
        [
            'name' => 'Website',
            'url'  => 'https://www.example.com',
            'icons' => ['cv' => 'codicon:globe', 'portfolio' => null],
            'types' => [
                TypeEnum::CV->value,
            ],
            'file' => [
                'name' => 'website.png',
                'url'  => fake()->placeholderImageUrl(64, 64),
            ],
        ],
    ],
];
