<script setup lang="ts">
import { ref, type Ref } from 'vue';
import { router } from '@inertiajs/vue3';
import DeleteButton from '@/components/DeleteButton.vue';
import DeleteDialog from '@/components/DeleteDialog.vue';
import { LinkButton } from '@/components/LinkButton';
import ListPanel from '@/components/ListPanel.vue';
import ListRow from '@/components/ListRow.vue';
import PageHeader from '@/components/PageHeader.vue';
import type { Site } from '@/types/portfolio';

const props = defineProps<{ sites: Site[] }>();

const deleteDialogOpen: Ref<boolean> = ref(false);
const deleting: Ref<Site | null> = ref(null);

const askToDelete = (site: Site) => {
    deleting.value = site;
    deleteDialogOpen.value = true;
};

const deleteSite = () => {
    deleteDialogOpen.value = false;
    if (deleting.value) router.delete(`/sites/${deleting.value.id}`);
};
</script>

<template>
    <PageHeader value="Sites" description="Your profiles elsewhere, such as GitHub and LinkedIn.">
        <LinkButton href="/sites/new">Add a site</LinkButton>
    </PageHeader>
    <ListPanel :empty="!props.sites?.length" empty-text="No sites yet. Add your GitHub or LinkedIn profile.">
        <ListRow v-for="site in props.sites" :key="site.id" :href="`/sites/${site.id}`">
            <template #title>{{ site.name }}</template>
            <template #subtitle>{{ site.url }}</template>
            <template #actions>
                <DeleteButton :name="site.name" @click="askToDelete(site)" />
            </template>
        </ListRow>
    </ListPanel>
    <DeleteDialog
        :title="`Delete ${deleting?.name}?`"
        message="This site will be deleted. This can't be undone."
        v-model="deleteDialogOpen"
        @confirm-delete="deleteSite"
    />
</template>
