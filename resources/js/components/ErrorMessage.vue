<script setup lang="ts">
import { AlertCircle } from 'lucide-vue-next';

defineProps({ value: String });
</script>

<template>
    <p role="alert" class="flex items-start gap-1.5 text-[0.8125rem] text-destructive">
        <AlertCircle class="mt-0.5 size-3.5 shrink-0" aria-hidden="true" />
        <span>{{ value }}</span>
    </p>
</template>
