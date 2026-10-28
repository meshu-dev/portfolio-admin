<script setup lang="ts">
import { Head } from '@inertiajs/vue3';
import type { SiteKey } from '@/components/Layout/navigation';

const props = defineProps<{
    value: string;
    /** Which public site this page's content appears on */
    site?: SiteKey;
    description?: string;
}>();

const siteLabel: Record<SiteKey, { text: string; class: string }> = {
    cv: { text: 'Shown on your CV', class: 'bg-cv-soft text-cv-strong' },
    portfolio: { text: 'Shown on your portfolio', class: 'bg-portfolio-soft text-portfolio-strong' },
};
</script>

<template>
    <Head :title="props.value" />
    <div class="mb-7 flex flex-wrap items-start justify-between gap-4">
        <div class="min-w-0">
            <h1 class="text-[1.875rem] leading-tight font-bold tracking-[-0.03em] text-balance">{{ value }}</h1>
            <p v-if="site || description" class="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-[0.9375rem] text-muted-foreground">
                <span v-if="site" :class="['rounded px-2 py-0.5 text-[0.8125rem] font-semibold', siteLabel[site].class]">
                    {{ siteLabel[site].text }}
                </span>
                <span v-if="description">{{ description }}</span>
            </p>
        </div>
        <div v-if="$slots.default" class="flex shrink-0 gap-2">
            <slot />
        </div>
    </div>
</template>
