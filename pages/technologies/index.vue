<script setup>
  import { onMounted } from 'vue';
  import { useTechnologyStore } from '@/stores/TechnologyStore';
  import ItemList from '@/components/Item/ItemList/ItemList';

  const technologyStore = useTechnologyStore();

  onMounted(async () => {
    if (technologyStore.areFetched == false) {
      await technologyStore.fetchTechnologies();
    }
  });
</script>

<template>
	<ItemList
    title="Technologies"
    link="technologies"
    :items="technologyStore.getTechnologies" />
</template>