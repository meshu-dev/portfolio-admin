<script setup>
  import { useProjectStore } from '@/stores/ProjectStore';
  import { addProject, editProject } from '@/composables/project/utils';
  import ItemForm from '@/components/Item/ItemForm/ItemForm';
  import setupData from '@/composables/project/setupData';

  const route = useRoute();
  const id = route.params.id;
  const isEdit = id != 'new' ? true : false;

  const projectStore = useProjectStore();

  const onSubmit = () => {
    const project = projectStore.getProject;
    return isEdit ? editProject(id, project) : addProject(project);
  };

  setupData(id);
</script>

<template>
  <ItemForm
    :title="isEdit ? 'Edit project' : 'Add project'"
    v-on:onSubmit="onSubmit">
    <v-text-field
      label="Name"
      v-model="projectStore.getProject.name"
      required />
  </ItemForm>
</template>
