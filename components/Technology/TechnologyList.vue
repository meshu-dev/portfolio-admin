<script setup>
  import { useTechnologyStore } from '@/stores/TechnologyStore';
  import setupData from '@/composables/technology/setupData';
  import ItemListHeader from '@/components/Item/ItemList/ItemListHeader';
  import ItemListTable from '@/components/Item/ItemList/ItemListTable';
  import ItemListPagination from '@/components/Item/ItemList/ItemListPagination';

  const props = defineProps({
    page: Number
  });

  const page = parseInt(props.page) || 1;

  const technologyStore = useTechnologyStore();
  technologyStore.changePage(page);

  setupData();

  const setCurrentTechnology = (id) => {
    technologyStore.setSelectedTechnology(id);
  };

  const onPageChange = async (page) => {
    let link = '/technologies';

    if (page > 1) {
      link = `${link}/${page}`;
    }
    await navigateTo(link);
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
    :currentPage="page"
    :totalPages="technologyStore.getLastPage"
    :onClickFtn="onPageChange" />
</template>
