<script setup lang="ts">
import Button from '@/components/ui/button/Button.vue';

const imageUrl = defineModel();

const removeImage = (): void => {
    imageUrl.value = '';
};
</script>

<template>
    <div class="flex flex-col gap-3 sm:flex-row sm:items-start">
        <img :src="imageUrl as string" alt="" class="w-full max-w-60 rounded-lg border object-cover" />
        <Button type="button" variant="outline" size="sm" class="cursor-pointer self-start" @click="removeImage"> Remove image </Button>
    </div>
</template>
