<script setup>
  import ProjectList from '@/components/Project/ProjectList';

  const route = useRoute();
  const page = route.params.page;
</script>

<template>
  <ProjectList :page="page" />
</template>
