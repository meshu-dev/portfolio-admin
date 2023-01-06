<script setup>
  import { useTechnologyStore } from '@/stores/TechnologyStore';
  import { technologyFormSubmit } from '@/composables/technology/utils';
  import ItemForm from '@/components/Item/ItemForm/ItemForm';
  import setupData from '@/composables/technology/setupData';

  const props = defineProps({
    id: String,
    title: String
  });

  const technologyStore = useTechnologyStore();

  setupData(props.id);
</script>

<template>
  <ItemForm
    :title="title"
    v-on:onSubmit="technologyFormSubmit">
    <v-text-field
      label="Name"
      v-model="technologyStore.getTechnology.name"
      required />
  </ItemForm>
</template>

