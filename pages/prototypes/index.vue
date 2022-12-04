<script setup>
  import { usePrototypeStore } from '@/stores/PrototypeStore';
  import ItemList from '@/components/Item/ItemList/ItemList';

  const prototypeStore = usePrototypeStore();

  fetchPrototypes();
</script>

<template>
  <ItemList
    title="Prototypes"
    link="prototypes"
    :items="prototypeStore.getPrototypes" />
</template>