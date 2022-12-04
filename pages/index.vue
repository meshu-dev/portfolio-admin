<script setup>
  import { onMounted } from 'vue';
  import { useProjectStore } from '@/stores/ProjectStore';
  import ItemList from '@/components/Item/ItemList/ItemList';

  const projectStore = useProjectStore();

  onMounted(async () => {
    if (projectStore.areFetched === false) {
      await projectStore.fetchProjects();
    }
  });
</script>

<template>
  <ItemList
    title="Projects"
    link="projects"
    :items="projectStore.getProjects" />
</template>