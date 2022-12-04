<script setup>
  import { onMounted } from 'vue';
  import { usePrototypeStore } from '@/stores/PrototypeStore';
  import ItemList from '@/components/Item/ItemList/ItemList';

  const prototypeStore = usePrototypeStore();

  onMounted(async () => {
    if (prototypeStore.areFetched === false) {
      await prototypeStore.fetchPrototypes();
    }
  });
</script>

<template>
  <ItemList
    title="Prototypes"
    link="prototypes"
    :items="prototypeStore.getPrototypes" />
</template>