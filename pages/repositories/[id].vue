<script setup>
  import { useRepositoryStore } from '@/stores/RepositoryStore';
  import ItemForm from '@/components/Item/ItemForm/ItemForm';
  import setupData from '@/composables/repository/setupData';
  import { onAdd, onEdit, onDelete } from '@/composables/repository/utils';

  const route = useRoute();
  const id = route.params.id;
  const isEdit = id != 'new' ? true : false;

  const repositoryStore = useRepositoryStore();

  const onSubmit = (name) => {
    return isEdit ? onEdit(name) : onAdd(name);
  }

  setupData(id);
</script>

<template>
  <ItemForm
    :isEdit="isEdit"
    :title="isEdit ? 'Edit repository' : 'Add repository'"
    :item="repositoryStore.getRepository"
    v-on:onSubmit="onSubmit"
    v-on:onDelete="onDelete" />
</template>
