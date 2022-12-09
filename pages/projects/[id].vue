<script setup>
  import { useProjectStore } from '@/stores/ProjectStore';
  import ItemForm from '@/components/Item/ItemForm/ItemForm';
  import setupData from '@/composables/project/setupData';
  import { onAdd, onEdit, onDelete } from '@/composables/project/utils';

  const route = useRoute();
  const id = route.params.id;
  const isEdit = id != 'new' ? true : false;

  const projectStore = useProjectStore();

  const onSubmit = () => {
    const project = projectStore.getProject;
    return isEdit ? onEdit(id, project) : onAdd(project);
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
