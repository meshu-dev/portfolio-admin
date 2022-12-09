<script setup>
  import { usePrototypeStore } from '@/stores/PrototypeStore';
  import ItemForm from '@/components/Item/ItemForm/ItemForm';
  import setupData from '@/composables/prototype/setupData';
  import { onAdd, onEdit } from '@/composables/prototype/utils';

  const route = useRoute();
  const id = route.params.id;
  const isEdit = id != 'new' ? true : false;

  const prototypeStore = usePrototypeStore();

  const onSubmit = () => {
    const prototype = prototypeStore.getPrototype;
    return isEdit ? onEdit(id, prototype) : onAdd(prototype);
  }

  setupData(id);
</script>

<template>
  <ItemForm
    :title="isEdit ? 'Edit prototype' : 'Add prototype'"
    v-on:onSubmit="onSubmit">
    <v-text-field
      label="Name"
      v-model="prototypeStore.getPrototype.name"
      required />
  </ItemForm>
</template>
