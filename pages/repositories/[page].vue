<script setup>
  import RepositoryList from '@/components/Repository/RepositoryList';

  const route = useRoute();
  const page = route.params.page;
</script>

<template>
  <RepositoryList :page="page" />
</template>
