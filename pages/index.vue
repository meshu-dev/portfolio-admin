<script setup>
  import { useProjectStore } from '@/stores/ProjectStore';
  import ItemList from '@/components/Item/ItemList/ItemList';

  const projectStore = useProjectStore();

  fetchProjects();
</script>

<template>
  <ItemList
    title="Projects"
    link="projects"
    :items="projectStore.getProjects" />
</template>