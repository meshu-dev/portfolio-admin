<script setup lang="ts">
import { Form, Head, Link } from '@inertiajs/vue3';
import ErrorMessage from '@/components/ErrorMessage.vue';
import Button from '@/components/ui/button/Button.vue';
import Input from '@/components/ui/input/Input.vue';
import Label from '@/components/ui/label/Label.vue';
</script>

<template>
    <Head title="Sign in" />
    <div class="w-full max-w-sm">
        <p class="text-[1.625rem] leading-tight font-bold tracking-[-0.03em]">Portfolio Admin</p>
        <p class="mt-2 text-[0.9375rem] text-muted-foreground">Edit the content of your CV and portfolio.</p>
        <span class="mt-4 flex gap-1.5" aria-hidden="true">
            <span class="h-1 w-8 rounded-full bg-cv" />
            <span class="h-1 w-8 rounded-full bg-portfolio" />
        </span>

        <div class="mt-8 rounded-xl border bg-panel p-6">
            <h1 class="mb-5 text-lg font-semibold">Sign in</h1>
            <Form action="/login" method="post" class="grid gap-4" #default="{ errors, processing }">
                <div class="grid gap-1.5">
                    <Label for="email" class="text-[0.8125rem] font-semibold">Email</Label>
                    <Input id="email" type="email" name="email" autocomplete="username" required :class="errors?.email && 'error-field'" />
                    <ErrorMessage v-if="errors?.email" :value="errors.email" />
                </div>
                <div class="grid gap-1.5">
                    <Label for="password" class="text-[0.8125rem] font-semibold">Password</Label>
                    <Input
                        id="password"
                        type="password"
                        name="password"
                        autocomplete="current-password"
                        required
                        :class="errors?.password && 'error-field'"
                    />
                    <ErrorMessage v-if="errors?.password" :value="errors.password" />
                </div>
                <Button class="mt-1 w-full cursor-pointer" type="submit" :disabled="processing">Sign in</Button>
            </Form>
        </div>

        <p class="mt-5 text-center text-[0.9375rem] text-muted-foreground">
            Just looking?
            <Link href="/login/demo" method="post" as="button" class="cursor-pointer font-semibold text-foreground underline underline-offset-2">
                Try the demo account
            </Link>
        </p>
    </div>
</template>
