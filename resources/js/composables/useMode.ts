import { onMounted, ref } from 'vue';

export type Mode = 'light' | 'dark' | 'system';

const COOKIE = 'mode';
const mode = ref<Mode>('system');

const prefersDark = (): boolean => typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches;

/** Adds or removes the dark class on <html> to match the choice. */
const apply = (value: Mode): void => {
    const dark = value === 'dark' || (value === 'system' && prefersDark());
    document.documentElement.classList.toggle('dark', dark);
};

const readCookie = (): Mode => {
    const match = document.cookie.match(/(?:^|; )mode=(light|dark|system)/);
    return (match?.[1] as Mode) ?? 'system';
};

let listening = false;

/** The theme choice. It is kept in a cookie so the server can render the right theme first time. */
export function useMode() {
    onMounted(() => {
        mode.value = readCookie();

        if (!listening) {
            listening = true;
            // When following the device, switch as soon as the device switches
            window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
                if (mode.value === 'system') apply('system');
            });
        }
    });

    const setMode = (value: Mode): void => {
        mode.value = value;
        document.cookie = `${COOKIE}=${value}; path=/; max-age=31536000; samesite=lax`;
        apply(value);
    };

    return { mode, setMode };
}
