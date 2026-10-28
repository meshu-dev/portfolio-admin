<script setup lang="ts">
import { ref, type Ref } from 'vue';
import { router } from '@inertiajs/vue3';
import DeleteButton from '@/components/DeleteButton.vue';
import DeleteDialog from '@/components/DeleteDialog.vue';
import { LinkButton } from '@/components/LinkButton';
import ListPanel from '@/components/ListPanel.vue';
import ListRow from '@/components/ListRow.vue';
import PageHeader from '@/components/PageHeader.vue';
import type { ProjectListItem } from '@/types/portfolio';

const props = defineProps<{ projects: ProjectListItem[] }>();

const deleteDialogOpen: Ref<boolean> = ref(false);
const deleting: Ref<ProjectListItem | null> = ref(null);

const askToDelete = (project: ProjectListItem) => {
    deleting.value = project;
    deleteDialogOpen.value = true;
};

const deleteProject = () => {
    deleteDialogOpen.value = false;
    if (deleting.value) router.delete(`/portfolio/projects/${deleting.value.id}`);
};
</script>

<template>
    <PageHeader value="Projects" site="portfolio" description="The work shown on your Projects page.">
        <LinkButton href="/portfolio/projects/new">Add a project</LinkButton>
    </PageHeader>
    <ListPanel :empty="!props.projects?.length" empty-text="No projects yet. Add one to show it on your portfolio.">
        <ListRow v-for="project in props.projects" :key="project.id" :href="`/portfolio/projects/${project.id}`">
            <template #title>{{ project.name }}</template>
            <template #subtitle>{{ project.url }}</template>
            <template #actions>
                <DeleteButton :name="project.name" @click="askToDelete(project)" />
            </template>
        </ListRow>
    </ListPanel>
    <DeleteDialog
        :title="`Delete ${deleting?.name}?`"
        message="This project will be removed from your portfolio. This can't be undone."
        v-model="deleteDialogOpen"
        @confirm-delete="deleteProject"
    />
</template>
