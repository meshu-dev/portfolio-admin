<script setup lang="ts">
import { router } from '@inertiajs/vue3';
import { onUnmounted } from 'vue';
import { toast } from 'vue-sonner';
import 'vue-sonner/style.css';
import { Toaster } from '@/components/ui/sonner';

onUnmounted(
    router.on('flash', (event) => {
        if (event.detail.flash['message']) {
            toast(event.detail.flash['message']);
        }
    }),
);
</script>

<template>
    <main class="flex min-h-screen items-center justify-center px-4 py-12">
        <slot />
    </main>
    <Toaster position="top-center" />
</template>
