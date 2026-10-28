export type SiteKey = 'cv' | 'portfolio';

export type NavItem = { name: string; url: string };

export type NavGroup = {
    name: string;
    site: SiteKey | null;
    items: NavItem[];
};

/** The admin's pages, grouped by the public site their content appears on. */
export const navGroups: NavGroup[] = [
    {
        name: 'CV',
        site: 'cv',
        items: [
            { name: 'Profile', url: '/' },
            { name: 'Skills', url: '/cv/skills' },
            { name: 'Work experience', url: '/cv/work-experiences' },
            { name: 'PDF', url: '/cv/pdf' },
        ],
    },
    {
        name: 'Portfolio',
        site: 'portfolio',
        items: [
            { name: 'Intro', url: '/portfolio/intro' },
            { name: 'About', url: '/portfolio/about' },
            { name: 'Projects', url: '/portfolio/projects' },
            { name: 'Repositories', url: '/portfolio/repositories' },
        ],
    },
    {
        name: 'Used by both',
        site: null,
        items: [
            { name: 'Technologies', url: '/technologies' },
            { name: 'Sites', url: '/sites' },
        ],
    },
];

/** A page is current when the URL is its own or one of its sub-pages ("/" only matches itself). */
export const isCurrent = (pageUrl: string, itemUrl: string): boolean => {
    const path = pageUrl.split('?')[0];
    return itemUrl === '/' ? path === '/' : path === itemUrl || path.startsWith(`${itemUrl}/`);
};
