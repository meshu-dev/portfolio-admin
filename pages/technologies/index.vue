<script setup>
  import { useTechnologyStore } from '@/stores/TechnologyStore';
  import setupData from '@/composables/technology/setupData';
  import ItemListHeader from '@/components/Item/ItemList/ItemListHeader';
  import ItemListTable from '@/components/Item/ItemList/ItemListTable';

  const technologyStore = useTechnologyStore();

  setupData();

  const setCurrentTechnology = (id) => {
    technologyStore.setSelectedTechnology(id);
  };
</script>

<template>
  <ItemListHeader
    title="Technologies"
    link="/technologies/new" />
  <ItemListTable
    :items="technologyStore.getTechnologies"
    link="/technologies"
    :preDeleteFtn="setCurrentTechnology" />
</template>