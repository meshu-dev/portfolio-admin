<script setup>
  import { useProjectStore } from '@/stores/ProjectStore';
  import ItemProjectForm from '@/components/Item/ItemForm/ItemProjectForm';
  import setupData from '@/composables/project/setupData';
  import { onAdd, onEdit, onDelete } from '@/composables/project/utils';

  const route = useRoute();
  const id = route.params.id;
  const isEdit = id != 'new' ? true : false;

  const projectStore = useProjectStore();

  const onSubmit = (name) => {
    return isEdit ? onEdit(id, name) : onAdd(name);
  };

  setupData(id);
</script>

<template>
  <ItemProjectForm
    :isEdit="isEdit"
    :title="isEdit ? 'Edit project' : 'Add project'"
    :item="projectStore.getProject"
    v-on:onSubmit="onSubmit"
    v-on:onDelete="onDelete" />
</template>
