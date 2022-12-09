<script setup>
  import { useTechnologyStore } from '@/stores/TechnologyStore';
  import ItemForm from '@/components/Item/ItemForm/ItemForm';
  import setupData from '@/composables/technology/setupData';
  import { onAdd, onEdit } from '@/composables/technology/utils';

  const route = useRoute();
  const id = route.params.id;
  const isEdit = id != 'new' ? true : false;

  const technologyStore = useTechnologyStore();

  const onSubmit = () => {
    const technology = repositoryStore.getRepository;
    return isEdit ? onEdit(id, technology) : onAdd(technology);
  }

  setupData(id);
</script>

<template>
  <ItemForm
    :title="isEdit ? 'Edit technology' : 'Add technology'"
    v-on:onSubmit="onSubmit">
    <v-text-field
      label="Name"
      v-model="technologyStore.getTechnology.name"
      required />
  </ItemForm>
</template>
