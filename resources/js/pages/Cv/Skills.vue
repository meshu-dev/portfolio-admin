<script setup lang="ts">
import { Form, useForm } from '@inertiajs/vue3';
import ErrorMessage from '@/components/ErrorMessage.vue';
import FormPanel from '@/components/FormPanel.vue';
import PageHeader from '@/components/PageHeader.vue';
import Button from '@/components/ui/button/Button.vue';
import Label from '@/components/ui/label/Label.vue';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import type { Technology } from '@/types/portfolio';

const props = defineProps({ skills: Object, technologies: Object, errors: Object });

const formProps: { [key: string]: string } = {};

for (const skill of props.skills) {
    formProps[skill.id] = skill.technologies.map((technology: Technology) => technology.id);
}

const form = useForm(formProps);

const transformData = (data) => {
    const params: { id: string; technologies: string[] }[] = [];

    for (const skillId of Object.keys(formProps)) {
        params.push({ id: skillId, technologies: form[skillId] });
    }
    data.skills = params;
    return { ...data };
};
</script>

<template>
    <PageHeader value="Skills" site="cv" description="The technologies listed under each heading on your CV." />
    <FormPanel>
        <Form action="/cv/skills" method="put" :transform="(data) => transformData(data)" class="grid gap-5">
            <div v-for="(skill, index) in skills" :key="skill.id" class="grid gap-1.5">
                <Label :for="`skill-${skill.id}`" class="text-[0.8125rem] font-semibold">{{ skill.name }}</Label>
                <Select multiple v-model:modelValue="form[skill.id]">
                    <SelectTrigger :id="`skill-${skill.id}`" class="w-full">
                        <SelectValue placeholder="Choose technologies" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem v-for="technology in technologies" :key="technology.id" :value="technology.id">
                            {{ technology.name }}
                        </SelectItem>
                    </SelectContent>
                </Select>
                <ErrorMessage v-if="errors && errors[`skills.${index}.technologies`]" :value="errors[`skills.${index}.technologies`]" />
            </div>
            <p class="text-[0.8125rem] text-muted-foreground">
                Missing one? Add it on the
                <a href="/technologies" class="font-medium text-foreground underline underline-offset-2">Technologies</a> page first.
            </p>
            <div>
                <Button class="cursor-pointer" type="submit">Save changes</Button>
            </div>
        </Form>
    </FormPanel>
</template>
