<script setup>
  import { useRepositoryStore } from '@/stores/RepositoryStore';
  import ItemForm from '@/components/Item/ItemForm/ItemForm';
  import setupData from '@/composables/repository/setupData';
  import { onAdd, onEdit } from '@/composables/repository/utils';

  const route = useRoute();
  const id = route.params.id;
  const isEdit = id != 'new' ? true : false;

  const repositoryStore = useRepositoryStore();

  const onSubmit = () => {
    const repository = repositoryStore.getRepository;
    return isEdit ? onEdit(id, repository) : onAdd(repository);
  }

  setupData(id);
</script>

<template>
  <ItemForm
    :title="isEdit ? 'Edit repository' : 'Add repository'"
    v-on:onSubmit="onSubmit">
    <v-text-field
        label="Name"
        v-model="repositoryStore.getRepository.name"
        required />
    <v-text-field
        label="Url"
        v-model="repositoryStore.getRepository.url"
        required />  
  </ItemForm>
</template>
