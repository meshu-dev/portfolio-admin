<script setup lang="ts">
import { useForm } from '@inertiajs/vue3';
import { Plus, X } from 'lucide-vue-next';
import DatePicker from '@/components/DatePicker.vue';
import ErrorMessage from '@/components/ErrorMessage.vue';
import FormField from '@/components/FormField.vue';
import FormPanel from '@/components/FormPanel.vue';
import { LinkButton } from '@/components/LinkButton';
import PageHeader from '@/components/PageHeader.vue';
import Button from '@/components/ui/button/Button.vue';
import Input from '@/components/ui/input/Input.vue';
import Label from '@/components/ui/label/Label.vue';
import { Switch } from '@/components/ui/switch';
import { dateToCalendarDate } from '@/lib/utils';
import type { WorkExperience } from '@/types/portfolio';

const props = defineProps({ workExperience: Object, errors: Object });
const workExperience: WorkExperience | null = props.workExperience ? (props.workExperience as WorkExperience) : null;
const responsibilityLimit: number = 5;

const form = useForm({
    title: workExperience?.title || '',
    company: workExperience?.company || '',
    location: workExperience?.location || '',
    is_current: !workExperience?.end_date || false,
    start_date: dateToCalendarDate(workExperience?.start_date || new Date().toDateString()),
    end_date: dateToCalendarDate(workExperience?.end_date || new Date().toDateString()),
    description: workExperience?.description || '',
    responsibilities: workExperience?.responsibilities || [],
    active: Boolean(workExperience?.active),
});

const addResponsibility = (): void => {
    form.responsibilities.push('');
};

const removeResponsibility = (index: number): void => {
    form.responsibilities.splice(index, 1);
};

const submitForm = (): void => {
    const transformParams = (data: any) => {
        data.start_date = form.start_date.toString();
        data.end_date = form.end_date ? form.end_date.toString() : null;
        return data;
    };

    if (workExperience?.id) {
        form.transform(transformParams).put(`/cv/work-experiences/${workExperience.id}`);
    } else {
        form.transform(transformParams).post('/cv/work-experiences');
    }
};
</script>

<template>
    <PageHeader :value="workExperience?.title || 'Add a role'" site="cv" description="Work experience" />
    <FormPanel>
        <form class="grid gap-5" @submit.prevent="submitForm">
            <FormField label="Job title" for="title" :error="errors?.title">
                <Input id="title" type="text" v-model="form.title" :class="errors?.title && 'error-field'" autoComplete="off" />
            </FormField>

            <div class="grid gap-5 sm:grid-cols-2">
                <FormField label="Company" for="company" :error="errors?.company">
                    <Input id="company" type="text" v-model="form.company" :class="errors?.company && 'error-field'" autoComplete="off" />
                </FormField>
                <FormField label="Location" for="location" :error="errors?.location">
                    <Input id="location" type="text" v-model="form.location" :class="errors?.location && 'error-field'" autoComplete="off" />
                </FormField>
            </div>

            <div class="grid gap-5 sm:grid-cols-2">
                <FormField label="Started" for="start_date" :error="errors?.start_date">
                    <DatePicker v-model="form.start_date" />
                </FormField>
                <div class="grid content-start gap-1.5">
                    <span class="text-[0.8125rem] font-semibold">Finished</span>
                    <div class="flex items-center gap-2.5 py-1.5">
                        <Switch id="is_current" v-model="form.is_current" />
                        <Label for="is_current" class="font-normal">I still work here</Label>
                    </div>
                    <DatePicker v-if="!form.is_current" v-model="form.end_date" />
                    <ErrorMessage v-if="errors?.end_date" :value="errors.end_date" />
                    <ErrorMessage v-if="errors?.is_current" :value="errors.is_current" />
                </div>
            </div>

            <FormField label="Summary" for="description" :error="errors?.description" hint="One line under the job title on your CV.">
                <Input
                    id="description"
                    type="text"
                    v-model="form.description"
                    class="font-serif text-base"
                    :class="errors?.description && 'error-field'"
                    autoComplete="off"
                />
            </FormField>

            <fieldset class="grid gap-2">
                <legend class="mb-1.5 text-[0.8125rem] font-semibold">Responsibilities</legend>
                <div v-for="(_, index) in form.responsibilities" :key="index" class="flex items-start gap-2">
                    <Input
                        :aria-label="`Responsibility ${index + 1}`"
                        type="text"
                        v-model="form.responsibilities[index]"
                        class="font-serif text-base"
                        :class="errors && errors[`responsibilities.${index}`] && 'error-field'"
                        autoComplete="off"
                    />
                    <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        class="shrink-0 cursor-pointer text-muted-foreground"
                        :aria-label="`Remove responsibility ${index + 1}`"
                        @click="removeResponsibility(index)"
                    >
                        <X class="size-4" />
                    </Button>
                </div>
                <ErrorMessage v-if="errors?.responsibilities" :value="errors.responsibilities" />
                <div>
                    <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        class="cursor-pointer"
                        :disabled="form.responsibilities.length >= responsibilityLimit"
                        @click="addResponsibility"
                    >
                        <Plus class="size-4" /> Add a responsibility
                    </Button>
                    <span class="ml-3 text-[0.8125rem] text-muted-foreground">Up to {{ responsibilityLimit }}.</span>
                </div>
            </fieldset>

            <div class="flex items-center gap-2.5 border-t pt-5">
                <Switch id="active" v-model="form.active" />
                <Label for="active" class="font-normal">Show this role on your CV</Label>
            </div>
            <ErrorMessage v-if="errors?.active" :value="errors.active" />

            <div class="flex gap-2">
                <Button type="submit" class="cursor-pointer" :disabled="form.processing">Save changes</Button>
                <LinkButton href="/cv/work-experiences" variant="ghost">Cancel</LinkButton>
            </div>
        </form>
    </FormPanel>
</template>
