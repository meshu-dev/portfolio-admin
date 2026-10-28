<script setup lang="ts">
import { Form, useForm } from '@inertiajs/vue3';
import FormField from '@/components/FormField.vue';
import FormPanel from '@/components/FormPanel.vue';
import PageHeader from '@/components/PageHeader.vue';
import Button from '@/components/ui/button/Button.vue';
import Input from '@/components/ui/input/Input.vue';

const props = defineProps({ line1: String, line2: String, yearsWorked: Number, errors: Object });

const form = useForm({
    line1: props.line1,
    line2: props.line2,
});
</script>

<template>
    <PageHeader value="Intro" site="portfolio" description="The two lines at the top of your portfolio's home page." />
    <FormPanel>
        <Form action="/portfolio/intro" method="put" class="grid gap-5">
            <FormField label="Headline" for="line1" :error="errors?.line1" hint="The large first line, for example your name.">
                <Input id="line1" type="text" name="line1" :class="errors?.line1 && 'error-field'" v-model="form.line1" autoComplete="off" />
            </FormField>
            <FormField
                label="Second line"
                for="line2"
                :error="errors?.line2"
                :hint="`Write ##years_worked## and it is replaced with your years of experience (${yearsWorked ?? 0} today).`"
            >
                <Input
                    id="line2"
                    type="text"
                    name="line2"
                    class="font-serif text-base"
                    :class="errors?.line2 && 'error-field'"
                    v-model="form.line2"
                    autoComplete="off"
                />
            </FormField>
            <div>
                <Button class="cursor-pointer" type="submit">Save changes</Button>
            </div>
        </Form>
    </FormPanel>
</template>
