<script setup>
  import { useRepositoryStore } from '@/stores/RepositoryStore';
  import setupData from '@/composables/repository/setupData';
  import ItemList from '@/components/Item/ItemList/ItemList';

  const repositoryStore = useRepositoryStore();

  setupData();
</script>

<template>
	<ItemList
    title="Repositories"
    link="repositories"
    :items="repositoryStore.getRepositories" />
</template>