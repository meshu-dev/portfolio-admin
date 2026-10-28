<script setup lang="ts">
import { Link } from '@inertiajs/vue3';

/** One row of a list. With an href the whole row opens it; actions in the "actions" slot stay clickable. */
defineProps<{ href?: string }>();
</script>

<template>
    <li class="relative flex items-center gap-4 px-4 py-3.5 transition-colors sm:px-5" :class="href && 'hover:bg-accent/60'">
        <div class="min-w-0 flex-1">
            <Link v-if="href" :href="href" class="font-semibold after:absolute after:inset-0 after:content-['']">
                <slot name="title" />
            </Link>
            <p v-else class="font-semibold"><slot name="title" /></p>
            <p v-if="$slots.subtitle" class="mt-0.5 truncate font-serif text-[0.9375rem] text-muted-foreground">
                <slot name="subtitle" />
            </p>
        </div>
        <div v-if="$slots.meta" class="hidden shrink-0 text-sm text-muted-foreground tabular-nums sm:block">
            <slot name="meta" />
        </div>
        <div v-if="$slots.actions" class="relative z-10 shrink-0">
            <slot name="actions" />
        </div>
    </li>
</template>
