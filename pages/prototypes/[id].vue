<script setup>
  import { usePrototypeStore } from '@/stores/PrototypeStore';
  import ItemProjectForm from '@/components/Item/ItemForm/ItemProjectForm';
  import setupData from '@/composables/prototype/setupData';
  import { onAdd, onEdit, onDelete } from '@/composables/prototype/utils';

  const route = useRoute();
  const id = route.params.id;
  const isEdit = id != 'new' ? true : false;

  const prototypeStore = usePrototypeStore();

  const onSubmit = (name) => {
    return isEdit ? onEdit(name) : onAdd(name);
  }

  setupData(id);
</script>

<template>
  <ItemProjectForm
    :isEdit="isEdit"
    :title="isEdit ? 'Edit prototype' : 'Add prototype'"
    :item="prototypeStore.getPrototype"
    v-on:onSubmit="onSubmit"
    v-on:onDelete="onDelete" />
</template>
