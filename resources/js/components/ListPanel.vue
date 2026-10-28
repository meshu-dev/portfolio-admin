<script setup lang="ts">
defineProps<{ empty?: boolean; emptyText?: string }>();
</script>

<template>
    <p v-if="empty" class="max-w-2xl rounded-xl border border-dashed bg-panel px-5 py-8 text-center text-muted-foreground">
        {{ emptyText }}
    </p>
    <ul v-else class="max-w-3xl divide-y divide-row-rule overflow-hidden rounded-xl border bg-panel">
        <slot />
    </ul>
</template>
