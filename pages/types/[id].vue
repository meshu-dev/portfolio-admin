<script setup>
  import { useTypeStore } from '@/stores/TypeStore';
  import ItemForm from '@/components/Item/ItemForm/ItemForm';

  const route = useRoute();
  const id = route.params.id;
  const isEdit = id != 'new' ? true : false;

  const typeStore = useTypeStore();

  const onAdd = async (name) => {
    await typeStore.addType(
      { name: name }
    );
    await onSuccess('Type has been added');
  }

  const onEdit = async (name) => {
    await typeStore.editType(
      id,
      { name: name }
    );
    await onSuccess('Type has been edited');
  }

  const onSubmit = (name) => {
    return isEdit ? onEdit(name) : onAdd(name);
  }

  const onSuccess = async (msg) => {
    setStatusMsg('success', msg);
    await navigateTo('/types');
  }

  const onDelete = async () => {
    await typeStore.deleteType(id);
    await onSuccess('Type has been deleted');
  }

  fetchTypes(id);
</script>

<template>
  <ItemForm
    :isEdit="isEdit"
    :title="isEdit ? 'Edit type' : 'Add type'"
    :item="typeStore.getType"
    v-on:onSubmit="onSubmit"
    v-on:onDelete="onDelete" />
</template>

<style lang="scss">

</style>
