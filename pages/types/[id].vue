<script setup>
  import { useTypeStore } from '@/stores/TypeStore';
  import ItemForm from '@/components/Item/ItemForm/ItemForm';
  import setupData from '@/composables/type/setupData';
  import { onAdd, onEdit } from '@/composables/type/utils';

  const route = useRoute();
  const id = route.params.id;
  const isEdit = id != 'new' ? true : false;

  const typeStore = useTypeStore();

  const onSubmit = () => {
    const type = typeStore.getType;
    return isEdit ? onEdit(id, type) : onAdd(type);
  }

  setupData(id);
</script>

<template>
  <ItemForm
    :title="isEdit ? 'Edit type' : 'Add type'"
    v-on:onSubmit="onSubmit">
    <v-text-field
      label="Name"
      v-model="typeStore.getType.name"
      required />  
  </ItemForm>
</template>
