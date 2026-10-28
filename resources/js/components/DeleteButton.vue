<script setup lang="ts">
import { Trash2 } from 'lucide-vue-next';

defineProps<{ name: string }>();
defineEmits(['click']);
</script>

<template>
    <button
        type="button"
        :aria-label="`Delete ${name}`"
        :title="`Delete ${name}`"
        class="grid size-9 cursor-pointer place-items-center rounded-md text-faint transition-colors hover:bg-destructive/10 hover:text-destructive"
        @click.stop.prevent="$emit('click')"
    >
        <Trash2 class="size-4" aria-hidden="true" />
    </button>
</template>
