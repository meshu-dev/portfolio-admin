<script setup>
  import { useRepositoryStore } from '@/stores/RepositoryStore';
  import { repositoryFormSubmit } from '@/composables/repository/utils';
  import ItemForm from '@/components/Item/ItemForm/ItemForm';
  import setupData from '@/composables/repository/setupData';

  const props = defineProps({
    id: String,
    title: String
  });

  const repositoryStore = useRepositoryStore();

  setupData(props.id);
</script>

<template>
  <ItemForm
    :title="title"
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
