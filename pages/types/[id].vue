<script setup>
  import { useTypeStore } from '@/stores/TypeStore';
  import { addType, editType } from '@/composables/type/utils';
  import ItemForm from '@/components/Item/ItemForm/ItemForm';
  import setupData from '@/composables/type/setupData';

  const route = useRoute();
  const id = route.params.id;
  const isEdit = id != 'new' ? true : false;

  const typeStore = useTypeStore();

  const onSubmit = () => {
    const type = typeStore.getType;
    return isEdit ? editType(id, type) : addType(type);
  }

  setupData(id);
</script>

<template>
  <ItemForm
    v-if="typeStore.getType"
    :title="isEdit ? 'Edit type' : 'Add type'"
    v-on:onSubmit="onSubmit">
    <v-text-field
      label="Name"
      v-model="typeStore.getType.name"
      required />  
  </ItemForm>
</template>
