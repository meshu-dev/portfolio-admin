<script setup>
  import { useTechnologyStore } from '@/stores/TechnologyStore';
  import ItemForm from '@/components/Item/ItemForm/ItemForm';

  const route = useRoute();
  const id = route.params.id;
  const isEdit = id != 'new' ? true : false;

  const technologyStore = useTechnologyStore();

  const onAdd = async (name) => {
    await technologyStore.addTechnology(
      { name: name }
    );
    await onSuccess('Technology has been added');
  }

  const onEdit = async (name) => {
    await technologyStore.editTechnology(
      id,
      { name: name }
    );
    await onSuccess('Technology has been edited');
  }

  const onSubmit = (name) => {
    return isEdit ? onEdit(name) : onAdd(name);
  }

  const onSuccess = async (msg) => {
    setStatusMsg('success', msg);
    await navigateTo('/technologies');
  }

  const onDelete = async () => {
    await technologyStore.deleteTechnology(id);
    await onSuccess('Technology has been deleted');
  }

  fetchTechnologies(id);
</script>

<template>
  <ItemForm
    :isEdit="isEdit"
    :title="isEdit ? 'Edit technology' : 'Add technology'"
    :item="technologyStore.getTechnology"
    v-on:onSubmit="onSubmit"
    v-on:onDelete="onDelete" />
</template>
