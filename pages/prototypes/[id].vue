<script setup>
  import { usePrototypeStore } from '@/stores/PrototypeStore';
  import ItemProjectForm from '@/components/Item/ItemForm/ItemProjectForm';

  const route = useRoute();
  const id = route.params.id;
  const isEdit = id != 'new' ? true : false;

  const prototypeStore = usePrototypeStore();

  const onAdd = async (name) => {
    await prototypeStore.addPrototype(
      { name: name }
    );
    await onSuccess('Prototype has been added');
  }

  const onEdit = async (name) => {
    await prototypeStore.editPrototype(
      id,
      { name: name }
    );
    await onSuccess('Prototype has been edited');
  }

  const onSubmit = (name) => {
    return isEdit ? onEdit(name) : onAdd(name);
  }

  const onSuccess = async (msg) => {
    setStatusMsg('success', msg);
    await navigateTo('/prototypes');
  }

  const onDelete = async () => {
    await prototypeStore.deletePrototype(id);
    await onSuccess('Prototype has been deleted');
  }

  fetchPrototypes(id);
</script>

<template>
  <ItemProjectForm
    :isEdit="isEdit"
    :title="isEdit ? 'Edit prototype' : 'Add prototype'"
    :item="prototypeStore.getPrototype"
    v-on:onSubmit="onSubmit"
    v-on:onDelete="onDelete" />
</template>
