<script setup lang="ts">
import { Link, usePage } from '@inertiajs/vue3';
import { computed } from 'vue';
import { cn } from '@/lib/utils';
import ThemeSwitch from './ThemeSwitch.vue';
import { isCurrent, navGroups, type SiteKey } from './navigation';

const emit = defineEmits<{ navigate: [] }>();

const page = usePage<{ siteUrls?: Record<SiteKey, string | null> }>();
const siteUrls = computed(() => page.props.siteUrls ?? { cv: null, portfolio: null });

const dot: Record<string, string> = { cv: 'bg-cv', portfolio: 'bg-portfolio', none: 'bg-muted-foreground' };
const current: Record<string, string> = {
    cv: 'bg-cv-soft text-cv-strong',
    portfolio: 'bg-portfolio-soft text-portfolio-strong',
    none: 'bg-accent text-foreground',
};
</script>

<template>
    <div class="flex h-full flex-col px-4 py-6">
        <Link href="/" class="mx-2 mb-7 text-lg font-bold tracking-tight" @click="emit('navigate')">Portfolio Admin</Link>
        <nav aria-label="Main" class="flex-1">
            <div v-for="group in navGroups" :key="group.name" class="mb-6">
                <div class="mx-2 mb-1.5 flex items-center justify-between text-[0.8125rem] font-semibold text-muted-foreground">
                    <span class="flex items-center gap-2">
                        <span :class="cn('size-2 rounded-[2px]', dot[group.site ?? 'none'])" aria-hidden="true" />
                        {{ group.name }}
                    </span>
                    <a
                        v-if="group.site && siteUrls[group.site]"
                        :href="siteUrls[group.site] as string"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="rounded px-1 text-xs font-medium hover:text-foreground"
                    >
                        Open site
                    </a>
                </div>
                <ul>
                    <li v-for="item in group.items" :key="item.url">
                        <Link
                            :href="item.url"
                            :aria-current="isCurrent(page.url, item.url) ? 'page' : undefined"
                            :class="
                                cn(
                                    'block rounded-md py-1.5 pr-2 pl-6 text-[0.9375rem] text-foreground/85 transition-colors hover:bg-accent hover:text-foreground',
                                    isCurrent(page.url, item.url) && ['font-semibold', current[group.site ?? 'none']],
                                )
                            "
                            @click="emit('navigate')"
                        >
                            {{ item.name }}
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
        <div class="mt-6 grid gap-3 border-t pt-4">
            <ThemeSwitch />
            <Link href="/logout" method="post" as="button" class="mx-2 cursor-pointer text-left text-sm text-muted-foreground hover:text-foreground">
                Sign out
            </Link>
        </div>
    </div>
</template>
