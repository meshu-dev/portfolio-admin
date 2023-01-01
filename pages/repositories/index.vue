<script setup>
  import { useRepositoryStore } from '@/stores/RepositoryStore';
  import setupData from '@/composables/repository/setupData';
  import ItemListHeader from '@/components/Item/ItemList/ItemListHeader';
  import ItemListTable from '@/components/Item/ItemList/ItemListTable';

  const repositoryStore = useRepositoryStore();

  setupData();

  const setCurrentRepository = (id) => {
    repositoryStore.setSelectedRepository(id);
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
</template>