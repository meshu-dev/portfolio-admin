<script setup>
  import { useTechnologyStore } from '@/stores/TechnologyStore';
  import ItemList from '@/components/Item/ItemList/ItemList';

  const technologyStore = useTechnologyStore();

  fetchTechnologies();
</script>

<template>
	<ItemList
    title="Technologies"
    link="technologies"
    :items="technologyStore.getTechnologies" />
</template>