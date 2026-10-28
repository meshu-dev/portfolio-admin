<script setup lang="ts">
import { ref, type Ref } from 'vue';
import { router } from '@inertiajs/vue3';
import DeleteButton from '@/components/DeleteButton.vue';
import DeleteDialog from '@/components/DeleteDialog.vue';
import ListPanel from '@/components/ListPanel.vue';
import ListRow from '@/components/ListRow.vue';
import PageHeader from '@/components/PageHeader.vue';
import AddRepositoryDialog from '@/components/Repository/AddRepositoryDialog.vue';
import Button from '@/components/ui/button/Button.vue';
import type { Repository } from '@/types/portfolio';

const props = defineProps<{ repositories: Repository[] }>();

const addDialogOpen: Ref<boolean> = ref(false);
const deleteDialogOpen: Ref<boolean> = ref(false);
const deleting: Ref<Repository | null> = ref(null);

const askToDelete = (repository: Repository) => {
    deleting.value = repository;
    deleteDialogOpen.value = true;
};

const deleteRepository = () => {
    deleteDialogOpen.value = false;
    if (deleting.value) router.delete(`/portfolio/repositories/${deleting.value.id}`);
};
</script>

<template>
    <PageHeader value="Repositories" site="portfolio" description="Code links you can attach to projects.">
        <Button class="cursor-pointer" @click="addDialogOpen = true">Add a repository</Button>
    </PageHeader>
    <ListPanel :empty="!props.repositories?.length" empty-text="No repositories yet. Add one, then attach it to a project.">
        <ListRow v-for="repository in props.repositories" :key="repository.id">
            <template #title>{{ repository.name }}</template>
            <template #subtitle>
                <a :href="repository.url" target="_blank" rel="noopener noreferrer" class="relative z-10 hover:text-foreground hover:underline">
                    {{ repository.url }}
                </a>
            </template>
            <template #actions>
                <DeleteButton :name="repository.name" @click="askToDelete(repository)" />
            </template>
        </ListRow>
    </ListPanel>
    <AddRepositoryDialog v-model="addDialogOpen" />
    <DeleteDialog
        :title="`Delete ${deleting?.name}?`"
        message="This repository will be deleted. This can't be undone."
        v-model="deleteDialogOpen"
        @confirm-delete="deleteRepository"
    />
</template>
