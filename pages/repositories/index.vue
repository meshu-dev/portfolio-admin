<script setup>
  import { useRepositoryStore } from '@/stores/RepositoryStore';
  import setupData from '@/composables/repository/setupData';
  import ItemListHeader from '@/components/Item/ItemList/ItemListHeader';
  import ItemListTable from '@/components/Item/ItemList/ItemListTable';
  import ItemListPagination from '@/components/Item/ItemList/ItemListPagination';

  const repositoryStore = useRepositoryStore();

  setupData();

  const setCurrentRepository = (id) => {
    repositoryStore.setSelectedRepository(id);
  };

  const onPageChange = async (page) => {
    await repositoryStore.changePage(page);
  };
</script>

<template>
  <ItemListHeader
    title="Repositories"
    link="/repositories/new" />
  <ItemListTable
    :items="repositoryStore.getRepositories"
    link="/repositories"
    :preDeleteFtn="setCurrentRepository" />
  <ItemListPagination
    :currentPage="repositoryStore.getCurrentPage"
    :totalPages="repositoryStore.getLastPage"
    :onClickFtn="onPageChange" />
</template>