<script setup lang="ts">
import { Link, router } from '@inertiajs/vue3';
import { Menu } from 'lucide-vue-next';
import { onUnmounted, ref } from 'vue';
import { toast } from 'vue-sonner';
import 'vue-sonner/style.css';
import AppSidebar from '@/components/Layout/AppSidebar.vue';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetDescription, SheetTitle } from '@/components/ui/sheet';
import { Toaster } from '@/components/ui/sonner';

// On wide screens the sidebar column fills the page height and its contents stay in view while the page scrolls.
// Comments stay out of the template: the server render drops them, which would break hydration.
const menuOpen = ref(false);

onUnmounted(
    router.on('flash', (event) => {
        if (event.detail.flash['message']) {
            toast(event.detail.flash['message']);
        }
    }),
);
</script>

<template>
    <a
        href="#content"
        class="sr-only rounded bg-primary px-4 py-2 font-semibold text-primary-foreground focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50"
    >
        Skip to content
    </a>
    <div class="min-h-screen lg:grid lg:grid-cols-[15.5rem_1fr]">
        <aside class="hidden border-r bg-panel lg:block">
            <div class="sticky top-0 h-screen overflow-y-auto">
                <AppSidebar />
            </div>
        </aside>

        <header class="sticky top-0 z-20 flex h-14 items-center justify-between border-b bg-panel px-4 lg:hidden">
            <Link href="/" class="font-bold tracking-tight">Portfolio Admin</Link>
            <Button variant="outline" size="icon" class="cursor-pointer" aria-label="Open menu" @click="menuOpen = true">
                <Menu class="size-5" />
            </Button>
        </header>
        <Sheet v-model:open="menuOpen">
            <SheetContent side="left" class="w-72 bg-panel p-0">
                <SheetTitle class="sr-only">Menu</SheetTitle>
                <SheetDescription class="sr-only">Pages in the admin</SheetDescription>
                <AppSidebar @navigate="menuOpen = false" />
            </SheetContent>
        </Sheet>

        <main id="content" class="w-full max-w-4xl px-4 py-8 sm:px-8 lg:px-11 lg:py-9">
            <slot />
        </main>
    </div>
    <Toaster position="top-center" />
</template>
