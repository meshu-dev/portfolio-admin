<script setup>
  import { useTypeStore } from '@/stores/TypeStore';
  import { typeFormSubmit } from '@/composables/type/utils';
  import ItemForm from '@/components/Item/ItemForm/ItemForm';
  import setupData from '@/composables/type/setupData';

  const props = defineProps({
    id: String,
    title: String
  });

  const typeStore = useTypeStore();

  setupData(props.id);
</script>

<template>
  <ItemForm
    v-if="typeStore.getType"
    :title="title"
    v-on:onSubmit="typeFormSubmit">
    <v-text-field
      label="Name"
      v-model="typeStore.getType.name"
      required />  
  </ItemForm>
</template>
