<script setup>
  import { usePrototypeStore } from '@/stores/PrototypeStore';
  import { addPrototype, editPrototype } from '@/composables/prototype/utils';
  import setupData from '@/composables/prototype/setupData';
  import ItemForm from '@/components/Item/ItemForm/ItemForm';
  import TypeSelect from '@/components/Item/ItemForm/TypeSelect';
  import TechnologySelect from '@/components/Item/ItemForm/TechnologySelect';
  import ItemImageForm from '@/components/Item/ItemForm/ItemImageForm';

  const route = useRoute();
  const id = route.params.id;
  const isEdit = id != 'new' ? true : false;

  const prototypeStore = usePrototypeStore();

  const onSubmit = () => {
    const prototype = prototypeStore.getPrototype;
    return isEdit ? editPrototype(id, prototype) : addPrototype(prototype);
  }

  setupData(id);
</script>

<template>
  <ItemForm
    v-if="prototypeStore.getPrototype"
    :title="isEdit ? 'Edit prototype' : 'Add prototype'"
    v-on:onSubmit="onSubmit">
    <v-text-field
      label="Name"
      v-model="prototypeStore.getPrototype.name"
      required />
    <TypeSelect />
    <TechnologySelect />
    <ItemImageForm
      :image="prototypeStore.getPrototype.image" />
  </ItemForm>
</template>
