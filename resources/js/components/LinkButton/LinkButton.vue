<script setup lang="ts">
import { Link } from '@inertiajs/vue3';
import type { VariantProps } from 'class-variance-authority';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

/** A link styled as a button. It stays a real link, so it can be opened in a new tab. */
defineProps<{ href: string; variant?: VariantProps<typeof buttonVariants>['variant']; class?: string }>();
</script>

<template>
    <Link :href="href" :class="cn(buttonVariants({ variant }), $props.class)"><slot /></Link>
</template>
