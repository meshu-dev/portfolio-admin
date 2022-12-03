<script setup>
  import { onMounted } from 'vue';
  import { useProjectStore } from '@/stores/ProjectStore';
  import ItemList from '@/components/Item/ItemList';

  const projectStore = useProjectStore();
  
  const getProjects = () => {
    return projectStore.getProjects;
  };

  onMounted(async () => {
    await projectStore.fetchProjects();
  });
</script>

<template>
	<div>
    <ItemList link="projects" :items="getProjects()" />
	</div>
</template>