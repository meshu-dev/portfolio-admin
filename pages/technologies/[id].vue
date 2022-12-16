<script setup>
  import { useTechnologyStore } from '@/stores/TechnologyStore';
  import { technologyFormSubmit } from '@/composables/technology/utils';
  import ItemForm from '@/components/Item/ItemForm/ItemForm';
  import setupData from '@/composables/technology/setupData';

  const route = useRoute();
  const id = route.params.id;
  const isEdit = id != 'new' ? true : false;

  const technologyStore = useTechnologyStore();

  setupData(id);
</script>

<template>
  <ItemForm
    :title="isEdit ? 'Edit technology' : 'Add technology'"
    v-on:onSubmit="technologyFormSubmit">
    <v-text-field
      label="Name"
      v-model="technologyStore.getTechnology.name"
      required />
  </ItemForm>
</template>
