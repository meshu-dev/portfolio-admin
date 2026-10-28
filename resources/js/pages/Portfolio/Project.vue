<script setup lang="ts">
import type { FormDataConvertible, Errors } from '@inertiajs/core';
import { useForm } from '@inertiajs/vue3';
import { Project, Repository, Technology } from '@/types/portfolio';
import FormField from '@/components/FormField.vue';
import FormPanel from '@/components/FormPanel.vue';
import { LinkButton } from '@/components/LinkButton';
import PageHeader from '@/components/PageHeader.vue';
import Input from '@/components/ui/input/Input.vue';
import Button from '@/components/ui/button/Button.vue';
import TechnologySelect from '@/components/Technology/TechnologySelect.vue';
import RepositorySelect from '@/components/Repository/RepositorySelect.vue';
import ImageView from '@/components/Image/ImageView.vue';
import ImageField from '@/components/Image/ImageField.vue';

const props = defineProps({ project: Object, repositories: Object, technologies: Object, errors: Object });
const project: Project | null = props.project?.data ? (props.project.data as Project) : null;

const form = useForm({
    name: project?.name || '',
    description: project?.description || '',
    url: project?.url || '',
    repositories: project?.repositories.map((repository: Repository) => repository.id) || [],
    technologies: project?.technologies.map((technology: Technology) => technology.id) || [],
    image: null,
    image_url: project?.image_url || '',
});

const transformParams = (data: Record<string, FormDataConvertible>) => {
    data.repositories = form.repositories;
    data.technologies = form.technologies;
    data.remove_image = project?.image_url && !form.image_url ? true : false;
    return data;
};

const submitForm = (): void => {
    if (project?.id) {
        form.transform(transformParams).put(`/portfolio/projects/${project.id}`);
    } else {
        form.transform(transformParams).post(`/portfolio/projects`);
    }
};
</script>

<template>
    <PageHeader :value="project?.name || 'Add a project'" site="portfolio" description="Projects" />
    <FormPanel>
        <form class="grid gap-5" @submit.prevent="submitForm">
            <div class="grid gap-5 sm:grid-cols-2">
                <FormField label="Name" for="name" :error="errors?.name">
                    <Input id="name" type="text" name="name" v-model="form.name" :class="errors?.name && 'error-field'" autoComplete="off" />
                </FormField>
                <FormField label="Website" for="url" :error="errors?.url">
                    <Input
                        id="url"
                        type="url"
                        name="url"
                        v-model="form.url"
                        :class="errors?.url && 'error-field'"
                        autoComplete="off"
                        placeholder="https://"
                    />
                </FormField>
            </div>
            <FormField label="Description" for="description" :error="errors?.description" hint="One line under the project name.">
                <Input
                    id="description"
                    type="text"
                    name="description"
                    v-model="form.description"
                    class="font-serif text-base"
                    :class="errors?.description && 'error-field'"
                    autoComplete="off"
                />
            </FormField>
            <FormField label="Repositories" for="repositories" :error="errors?.repositories">
                <RepositorySelect v-model="form.repositories" :class="errors?.repositories && 'error-field'" :repositories="$props.repositories" />
            </FormField>
            <FormField label="Technologies" for="technologies" :error="errors?.technologies">
                <TechnologySelect v-model="form.technologies" :class="errors?.technologies && 'error-field'" :technologies="$props.technologies" />
            </FormField>
            <FormField label="Image" for="image" :error="errors?.image">
                <ImageView v-if="form.image_url" v-model="form.image_url" />
                <ImageField v-else v-model:image="form.image" v-model:progress="form.progress" />
            </FormField>
            <div class="flex gap-2">
                <Button type="submit" class="cursor-pointer" :disabled="form.processing">Save changes</Button>
                <LinkButton href="/portfolio/projects" variant="ghost">Cancel</LinkButton>
            </div>
        </form>
    </FormPanel>
</template>
