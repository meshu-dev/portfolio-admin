import { createInertiaApp } from '@inertiajs/vue3';
import AuthLayout from './layouts/AuthLayout.vue';
import UserLayout from './layouts/UserLayout.vue';

const appName = 'Portfolio Admin';

createInertiaApp({
    title: (title) => (title ? `${title} | ${appName}` : appName),
    progress: {
        color: '#0b7a83',
    },
    layout: (name) => {
        if (name.startsWith('Login')) {
            return AuthLayout
        }
        return UserLayout
    },
});
