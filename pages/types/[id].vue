<script setup>
  import { useTypeStore } from '@/stores/TypeStore';
  import ItemForm from '@/components/Item/ItemForm/ItemForm';

  const typeStore = useTypeStore();

  fetchTypes();

  const route = useRoute();
  const id = route.params.id;

  if (id !== 'new') {
    
  }

  const onSubmit = (name) => {
    console.log('sss', name, name.value);
  }

  console.log('id', id);
</script>

<template>
  <div>Type Form</div>
  <ItemForm
    v-on:onSubmit="onSubmit" />
</template>

<style lang="scss">

</style>
