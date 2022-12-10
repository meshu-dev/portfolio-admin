<script setup>
  import { useRepositoryStore } from '@/stores/RepositoryStore';
  import { addRepository, editRepository } from '@/composables/repository/utils';
  import ItemForm from '@/components/Item/ItemForm/ItemForm';
  import setupData from '@/composables/repository/setupData';

  const route = useRoute();
  const id = route.params.id;
  const isEdit = id != 'new' ? true : false;

  const repositoryStore = useRepositoryStore();

  const onSubmit = () => {
    const repository = repositoryStore.getRepository;
    return isEdit ? editRepository(id, repository) : addRepository(repository);
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
