<script setup>
  import { useTechnologyStore } from '@/stores/TechnologyStore';
  import setupData from '@/composables/technology/setupData';
  import ItemListHeader from '@/components/Item/ItemList/ItemListHeader';
  import ItemListTable from '@/components/Item/ItemList/ItemListTable';
  import ItemListPagination from '@/components/Item/ItemList/ItemListPagination';

  const technologyStore = useTechnologyStore();

  setupData();

  const setCurrentTechnology = (id) => {
    technologyStore.setSelectedTechnology(id);
  };

  const onPageChange = async (page) => {
    await technologyStore.changePage(page);
  };
</script>

<template>
  <ItemListHeader
    title="Technologies"
    link="/technologies/add" />
  <ItemListTable
    :items="technologyStore.getTechnologies"
    link="/technologies"
    :preDeleteFtn="setCurrentTechnology" />
  <ItemListPagination
    :currentPage="technologyStore.getCurrentPage"
    :totalPages="technologyStore.getLastPage"
    :onClickFtn="onPageChange" />
</template>
