<script setup>
  import { useTypeStore } from '@/stores/TypeStore';
  import setupData from '@/composables/type/setupData';
  import ItemListHeader from '@/components/Item/ItemList/ItemListHeader';
  import ItemListTable from '@/components/Item/ItemList/ItemListTable';
  import ItemListPagination from '@/components/Item/ItemList/ItemListPagination';

  const props = defineProps({
    page: Number
  });

  const page = parseInt(props.page) || 1;

  const typeStore = useTypeStore();
  typeStore.changePage(page);

  setupData();

  const setCurrentType = (id) => {
    typeStore.setSelectedType(id);
  };

  const onPageChange = async (page) => {
    let link = '/types';

    if (page > 1) {
      link = `${link}/${page}`;
    }
    await navigateTo(link);
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
    :currentPage="page"
    :totalPages="typeStore.getLastPage"
    :onClickFtn="onPageChange" />
</template>
