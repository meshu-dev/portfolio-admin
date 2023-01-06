<script setup>
  import ProjectForm from '@/components/Project/ProjectForm';

  const route = useRoute();
  const id = route.params.id;
</script>

<template>
  <ProjectForm :id="id" title="Edit project" />
</template>
