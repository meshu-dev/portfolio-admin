<script setup>
  import { useRepositoryStore } from '@/stores/RepositoryStore';
  import setupData from '@/composables/repository/setupData';
  import ItemListHeader from '@/components/Item/ItemList/ItemListHeader';
  import ItemListTable from '@/components/Item/ItemList/ItemListTable';
  import ItemListPagination from '@/components/Item/ItemList/ItemListPagination';

  const props = defineProps({
    page: Number
  });

  const page = parseInt(props.page) || 1;

  const repositoryStore = useRepositoryStore();
  repositoryStore.changePage(page);

  setupData();

  const setCurrentRepository = (id) => {
    repositoryStore.setSelectedRepository(id);
  };

  const onPageChange = async (page) => {
    let link = '/repositories';

    if (page > 1) {
      link = `${link}/${page}`;
    }
    await navigateTo(link);
  };
</script>

<template>
  <ItemListHeader
    title="Repositories"
    link="/repositories/add" />
  <ItemListTable
    :items="repositoryStore.getRepositories"
    link="/repositories"
    :preDeleteFtn="setCurrentRepository" />
  <ItemListPagination
    :currentPage="page"
    :totalPages="repositoryStore.getLastPage"
    :onClickFtn="onPageChange" />
</template>
