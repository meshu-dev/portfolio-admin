<script setup>
  import { useTypeStore } from '@/stores/TypeStore';
  import ItemForm from '@/components/Item/ItemForm/ItemForm';
  import setupData from '@/composables/type/setupData';
  import { onAdd, onEdit, onDelete } from '@/composables/type/utils';

  const route = useRoute();
  const id = route.params.id;
  const isEdit = id != 'new' ? true : false;

  const typeStore = useTypeStore();

  const onSubmit = (name) => {
    return isEdit ? onEdit(name) : onAdd(name);
  }

  setupData(id);
</script>

<template>
  <ItemForm
    :isEdit="isEdit"
    :title="isEdit ? 'Edit type' : 'Add type'"
    :item="typeStore.getType"
    v-on:onSubmit="onSubmit"
    v-on:onDelete="onDelete" />
</template>
