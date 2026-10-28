<script setup lang="ts">
import { ref, type Ref } from 'vue';
import { router } from '@inertiajs/vue3';
import DeleteButton from '@/components/DeleteButton.vue';
import DeleteDialog from '@/components/DeleteDialog.vue';
import PageHeader from '@/components/PageHeader.vue';
import AddTechnologyDialog from '@/components/Technology/AddTechnologyDialog.vue';
import Button from '@/components/ui/button/Button.vue';
import type { Technology } from '@/types/portfolio';

const props = defineProps<{ technologies: Technology[] }>();

const addDialogOpen: Ref<boolean> = ref(false);
const deleteDialogOpen: Ref<boolean> = ref(false);
const deleting: Ref<Technology | null> = ref(null);

const askToDelete = (technology: Technology) => {
    deleting.value = technology;
    deleteDialogOpen.value = true;
};

const deleteTechnology = () => {
    deleteDialogOpen.value = false;
    if (deleting.value) router.delete(`/technologies/${deleting.value.id}`);
};
</script>

<template>
    <PageHeader value="Technologies" description="The list you pick from for CV skills, the About page and projects.">
        <Button class="cursor-pointer" @click="addDialogOpen = true">Add a technology</Button>
    </PageHeader>
    <p v-if="!props.technologies?.length" class="rounded-xl border border-dashed bg-panel px-5 py-8 text-center text-muted-foreground">
        No technologies yet. Add the languages and tools you use.
    </p>
    <ul v-else class="grid gap-x-6 rounded-xl border bg-panel p-2 sm:grid-cols-2 md:grid-cols-3">
        <li
            v-for="technology in props.technologies"
            :key="technology.id"
            class="flex items-center justify-between gap-2 rounded-md py-1 pr-1 pl-3 hover:bg-accent/60"
        >
            <span class="truncate">{{ technology.name }}</span>
            <DeleteButton :name="technology.name" @click="askToDelete(technology)" />
        </li>
    </ul>
    <AddTechnologyDialog v-model="addDialogOpen" />
    <DeleteDialog
        :title="`Delete ${deleting?.name}?`"
        message="This technology will be deleted. This can't be undone."
        v-model="deleteDialogOpen"
        @confirm-delete="deleteTechnology"
    />
</template>
