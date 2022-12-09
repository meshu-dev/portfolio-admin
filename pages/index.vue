<script setup>
  import { useProjectStore } from '@/stores/ProjectStore';
  import setupData from '@/composables/project/setupData';
  import ItemList from '@/components/Item/ItemList/ItemList';

  const projectStore = useProjectStore();

  setupData();
</script>

<template>
  <ItemList
    title="Projects"
    link="projects"
    :items="projectStore.getProjects" />
</template>