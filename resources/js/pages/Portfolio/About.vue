<script setup lang="ts">
import type { FormDataConvertible, RequestPayload } from '@inertiajs/core';
import { Form, router, useForm } from '@inertiajs/vue3';
import FormField from '@/components/FormField.vue';
import FormPanel from '@/components/FormPanel.vue';
import ImageField from '@/components/Image/ImageField.vue';
import ImageView from '@/components/Image/ImageView.vue';
import PageHeader from '@/components/PageHeader.vue';
import Button from '@/components/ui/button/Button.vue';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { getFormOptions } from '@/lib/utils';
import { htmlToParagraphs, paragraphsToHtml } from '@/lib/paragraphs';
import type { About, Technology } from '@/types/portfolio';

const props = defineProps({ about: Object, technologies: Object, errors: Object });
const about: About | null = props?.about.data ? (props.about.data as About) : null;

const formOptions = getFormOptions();
formOptions['only'].push('about');

const form = useForm({
    text: htmlToParagraphs(about?.text),
    skillTechnologies: about?.technologies.map((technology: Technology) => technology.id),
    image: null,
    image_url: about?.image_url || '',
});

const transformData = (data: Record<string, FormDataConvertible>) => {
    data.text = paragraphsToHtml(form.text);
    data.technologies = form.skillTechnologies;
    data.remove_image = about?.image_url && !form.image_url ? true : false;
    return { ...data };
};

const handleSuccess = (payload: RequestPayload): void => {
    form.image_url = payload.props?.about.data.image_url || '';
    router.reload();
};
</script>

<template>
    <PageHeader value="About" site="portfolio" description="Your About page: a short bio, your skills and a photo." />
    <FormPanel>
        <Form action="/portfolio/about" method="put" :options="formOptions" :transform="transformData" class="grid gap-5" @success="handleSuccess">
            <FormField label="Bio" for="text" :error="errors?.text" hint="Leave a blank line between paragraphs.">
                <Textarea
                    id="text"
                    name="text"
                    class="min-h-56 font-serif text-base leading-relaxed"
                    :class="errors?.text && 'error-field'"
                    v-model="form.text"
                    autoComplete="off"
                />
            </FormField>
            <FormField label="Skills" for="about-skills" :error="errors?.technologies">
                <Select name="technologies" multiple v-model:modelValue="form.skillTechnologies">
                    <SelectTrigger id="about-skills" class="w-full">
                        <SelectValue placeholder="Choose technologies" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem v-for="technology in technologies" :key="technology.id" :value="technology.id">
                            {{ technology.name }}
                        </SelectItem>
                    </SelectContent>
                </Select>
            </FormField>
            <FormField label="Photo" for="image" :error="errors?.image">
                <ImageView v-if="form.image_url" v-model="form.image_url" />
                <ImageField v-else v-model:image="form.image" v-model:progress="form.progress" />
            </FormField>
            <div>
                <Button class="cursor-pointer" type="submit">Save changes</Button>
            </div>
        </Form>
    </FormPanel>
</template>
