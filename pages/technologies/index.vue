<script setup>
  import { useTechnologyStore } from '@/stores/TechnologyStore';
  import setupData from '@/composables/technology/setupData';
  import ItemList from '@/components/Item/ItemList/ItemList';

  const technologyStore = useTechnologyStore();

  setupData();
</script>

<template>
	<ItemList
    title="Technologies"
    link="technologies"
    :items="technologyStore.getTechnologies" />
</template>