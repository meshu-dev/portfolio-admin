import { createInertiaApp } from '@inertiajs/vue3';
import createServer from '@inertiajs/vue3/server';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import type { DefineComponent } from 'vue';
import { createSSRApp, h } from 'vue';
import { renderToString } from 'vue/server-renderer';
import AuthLayout from './layouts/AuthLayout.vue';
import UserLayout from './layouts/UserLayout.vue';

// Must match app.ts, or the server renders a different page from the browser and the layout flashes in
const appName = 'Portfolio Admin';

createServer(
    (page) =>
        createInertiaApp({
            page,
            render: renderToString,
            title: (title) => (title ? `${title} | ${appName}` : appName),
            resolve: resolvePage,
            setup: ({ App, props, plugin }) => createSSRApp({ render: () => h(App, props) }).use(plugin),
        }),
    { cluster: true },
);

async function resolvePage(name: string) {
    const pages = import.meta.glob<DefineComponent>('./pages/**/*.vue');
    const page = await resolvePageComponent<DefineComponent>(`./pages/${name}.vue`, pages);

    page.default.layout ??= name.startsWith('Login') ? AuthLayout : UserLayout;

    return page;
}
