<script setup lang="ts">
import { ref, type Ref } from 'vue';
import { router } from '@inertiajs/vue3';
import dayjs from 'dayjs';
import DeleteButton from '@/components/DeleteButton.vue';
import DeleteDialog from '@/components/DeleteDialog.vue';
import { LinkButton } from '@/components/LinkButton';
import ListPanel from '@/components/ListPanel.vue';
import ListRow from '@/components/ListRow.vue';
import PageHeader from '@/components/PageHeader.vue';

type WorkExperienceRow = {
    id: string;
    title: string;
    company: string;
    start_date: string;
    end_date: string | null;
    active: boolean;
};

const props = defineProps<{ workExperiences: WorkExperienceRow[] }>();

const deleteDialogOpen: Ref<boolean> = ref(false);
const deleting: Ref<WorkExperienceRow | null> = ref(null);

const askToDelete = (workExperience: WorkExperienceRow) => {
    deleting.value = workExperience;
    deleteDialogOpen.value = true;
};

const deleteWorkExperience = () => {
    deleteDialogOpen.value = false;
    if (deleting.value) router.delete(`/cv/work-experiences/${deleting.value.id}`);
};

const dates = (workExperience: WorkExperienceRow): string => {
    const start = dayjs(workExperience.start_date).format('MMM YYYY');
    const end = workExperience.end_date ? dayjs(workExperience.end_date).format('MMM YYYY') : 'Present';
    return `${start} – ${end}`;
};
</script>

<template>
    <PageHeader value="Work experience" site="cv" description="The roles on your CV.">
        <LinkButton href="/cv/work-experiences/new">Add a role</LinkButton>
    </PageHeader>
    <ListPanel :empty="!props.workExperiences?.length" empty-text="No roles yet. Add your current or most recent job first.">
        <ListRow v-for="workExperience in props.workExperiences" :key="workExperience.id" :href="`/cv/work-experiences/${workExperience.id}`">
            <template #title>{{ workExperience.title }}</template>
            <template #subtitle>
                {{ workExperience.company }}
                <span v-if="!workExperience.active" class="ml-1 font-sans text-[0.8125rem] font-medium text-faint">Hidden from CV</span>
            </template>
            <template #meta>
                <span :class="!workExperience.end_date && 'font-semibold text-cv'">{{ dates(workExperience) }}</span>
            </template>
            <template #actions>
                <DeleteButton :name="workExperience.title" @click="askToDelete(workExperience)" />
            </template>
        </ListRow>
    </ListPanel>
    <DeleteDialog
        :title="`Delete ${deleting?.title}?`"
        message="This role will be removed from your CV. This can't be undone."
        v-model="deleteDialogOpen"
        @confirm-delete="deleteWorkExperience"
    />
</template>
