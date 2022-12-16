<script setup>
  import { usePrototypeStore } from '@/stores/PrototypeStore';
  import setupData from '@/composables/prototype/setupData';
  import ItemList from '@/components/Item/ItemList/ItemList';

  const prototypeStore = usePrototypeStore();

  setupData();
</script>

<template>
  <ItemList
    title="Prototypes"
    link="prototypes"
    :items="prototypeStore.getPrototypes" />
</template>