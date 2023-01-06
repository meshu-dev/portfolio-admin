<script setup>
  import RepositoryForm from '@/components/Repository/RepositoryForm';

  const route = useRoute();
  const id = route.params.id;
</script>

<template>
  <RepositoryForm :id="id" title="Edit repository" />
</template>
