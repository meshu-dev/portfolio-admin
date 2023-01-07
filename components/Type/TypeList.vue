<script setup>
  import { useTypeStore } from '@/stores/TypeStore';
  import setupData from '@/composables/type/setupData';
  import ItemListHeader from '@/components/Item/ItemList/ItemListHeader';
  import ItemListTable from '@/components/Item/ItemList/ItemListTable';
  import ItemListPagination from '@/components/Item/ItemList/ItemListPagination';

  const typeStore = useTypeStore();

  setupData();

  const setCurrentType = (id) => {
    typeStore.setSelectedType(id);
  };

  const onPageChange = async (page) => {
    await typeStore.changePage(page);
  };
</script>

<template>
  <ItemListHeader
    title="Types"
    link="/types/add" />
  <ItemListTable
    :items="typeStore.getTypes"
    link="/types"
    :preDeleteFtn="setCurrentType" />
  <ItemListPagination
    :currentPage="typeStore.getCurrentPage"
    :totalPages="typeStore.getLastPage"
    :onClickFtn="onPageChange" />
</template>
