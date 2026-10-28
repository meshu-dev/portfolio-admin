<script setup lang="ts">
import { Monitor, Moon, Sun } from 'lucide-vue-next';
import { type Mode, useMode } from '@/composables/useMode';

const { mode, setMode } = useMode();

const options: { value: Mode; label: string; icon: typeof Sun }[] = [
    { value: 'light', label: 'Light', icon: Sun },
    { value: 'dark', label: 'Dark', icon: Moon },
    { value: 'system', label: 'Device', icon: Monitor },
];
</script>

<template>
    <div role="radiogroup" aria-label="Theme" class="flex gap-1 rounded-lg border bg-background p-1">
        <button
            v-for="option in options"
            :key="option.value"
            type="button"
            role="radio"
            :aria-checked="mode === option.value"
            class="flex flex-1 cursor-pointer items-center justify-center gap-1 rounded-md px-2 py-2 text-xs text-muted-foreground transition-colors hover:text-foreground aria-checked:bg-panel aria-checked:font-semibold aria-checked:text-foreground aria-checked:shadow-[0_0_0_1px_var(--border)]"
            @click="setMode(option.value)"
        >
            <component :is="option.icon" class="size-3.5" aria-hidden="true" />
            {{ option.label }}
        </button>
    </div>
</template>
