<script setup lang="ts">
import { AlertCircle } from 'lucide-vue-next';
import Label from '@/components/ui/label/Label.vue';

defineProps<{ label: string; for?: string; hint?: string; error?: string }>();
</script>

<template>
    <div class="grid content-start gap-1.5">
        <Label :for="$props.for" class="text-[0.8125rem] font-semibold">{{ label }}</Label>
        <slot />
        <p v-if="error" role="alert" class="flex items-start gap-1.5 text-[0.8125rem] text-destructive">
            <AlertCircle class="mt-0.5 size-3.5 shrink-0" aria-hidden="true" />
            {{ error }}
        </p>
        <p v-else-if="hint" class="text-[0.8125rem] text-muted-foreground">{{ hint }}</p>
    </div>
</template>
