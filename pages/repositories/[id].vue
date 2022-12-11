<script setup>
  import { useRepositoryStore } from '@/stores/RepositoryStore';
  import { repositoryFormSubmit } from '@/composables/repository/utils';
  import ItemForm from '@/components/Item/ItemForm/ItemForm';
  import setupData from '@/composables/repository/setupData';

  const route = useRoute();
  const id = route.params.id;
  const isEdit = id != 'new' ? true : false;

  const repositoryStore = useRepositoryStore();

  setupData(id);
</script>

<template>
  <ItemForm
    :title="isEdit ? 'Edit repository' : 'Add repository'"
    v-on:onSubmit="repositoryFormSubmit">
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
