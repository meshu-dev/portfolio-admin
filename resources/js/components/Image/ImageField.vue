<script setup lang="ts">
import Input from '@/components/ui/input/Input.vue';
import { Progress } from '@/components/ui/progress';

const image = defineModel('image');
const progress = defineModel('progress');
</script>

<template>
    <Input
        id="image"
        type="file"
        name="image"
        accept="image/*"
        class="max-w-sm cursor-pointer file:mr-3 file:cursor-pointer file:font-semibold"
        @input="image = $event.target.files[0]"
    />
    <Progress v-if="progress" :model-value="progress.percentage" class="max-w-sm" />
</template>
