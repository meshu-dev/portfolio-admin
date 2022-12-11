<script setup>
  import { useProjectStore } from '@/stores/ProjectStore';
  import setupData from '@/composables/project/setupData';
  import { setParamsToProject, projectFormSubmit } from '@/composables/project/utils';
  import PortfolioForm from '@/components/Item/ItemForm/PortfolioForm';

  const route = useRoute();
  const id = route.params.id;
  const isEdit = id != 'new' ? true : false;

  const projectStore = useProjectStore();
  const project = ref(projectStore.getProject);

  setupData(id);

  const onSubmit = async (params) => {
    setParamsToProject(params);
    await projectFormSubmit();
    
    console.log('Burger', params);
  };
</script>

<template>
  <PortfolioForm
    v-if="project"
    :title="isEdit ? 'Edit project' : 'Add project'"
    :item="project"
    v-on:onSubmit="onSubmit" />
</template>
