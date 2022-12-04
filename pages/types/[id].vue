<script setup>
  import { useTypeStore } from '@/stores/TypeStore';
  import ItemForm from '@/components/Item/ItemForm/ItemForm';

  const route = useRoute();
  const id = route.params.id;
  const isEdit = id != 'new' ? true : false;

  const typeStore = useTypeStore();

  const onAdd = async (name) => {
    console.log('onAdd');

    await typeStore.addType(
      { name: name }
    );
    await onSuccess('Type has been added');
  }

  const onEdit = async (name) => {
    console.log('onEdit');

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

  fetchTypes(id);
</script>

<template>
  <ItemForm
    :isEdit="isEdit"
    :title="isEdit ? 'Edit type' : 'Add type'"
    :item="typeStore.getType"
    v-on:onSubmit="onSubmit" />
</template>

<style lang="scss">

</style>
