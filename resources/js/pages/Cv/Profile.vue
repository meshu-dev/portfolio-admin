<script setup lang="ts">
import { Form, useForm } from '@inertiajs/vue3';
import FormField from '@/components/FormField.vue';
import FormPanel from '@/components/FormPanel.vue';
import PageHeader from '@/components/PageHeader.vue';
import Button from '@/components/ui/button/Button.vue';
import Input from '@/components/ui/input/Input.vue';
import { Textarea } from '@/components/ui/textarea';

const props = defineProps({ intro: String, location: String, yearsWorked: Number, errors: Object });

const form = useForm({
    intro: props.intro,
    location: props.location,
});
</script>

<template>
    <PageHeader value="Profile" site="cv" description="The introduction at the top of your CV." />
    <FormPanel>
        <Form action="/cv/profile" method="put" class="grid gap-5">
            <FormField
                label="Intro"
                for="intro"
                :error="errors?.intro"
                :hint="`Write ##years_worked## and it is replaced with your years of experience (${yearsWorked ?? 0} today).`"
            >
                <Textarea
                    id="intro"
                    name="intro"
                    rows="2"
                    class="min-h-0 font-serif text-base leading-relaxed"
                    :class="errors?.intro && 'error-field'"
                    v-model="form.intro"
                    autoComplete="off"
                />
            </FormField>
            <FormField label="Location" for="location" :error="errors?.location" hint="For example, London, UK.">
                <Input
                    id="location"
                    type="text"
                    name="location"
                    class="max-w-sm"
                    :class="errors?.location && 'error-field'"
                    v-model="form.location"
                    autoComplete="off"
                />
            </FormField>
            <div>
                <Button class="cursor-pointer" type="submit">Save changes</Button>
            </div>
        </Form>
    </FormPanel>
</template>
