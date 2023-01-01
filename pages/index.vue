<script setup>
  import { useProjectStore } from '@/stores/ProjectStore';
  import setupData from '@/composables/project/setupData';
  import ItemListHeader from '@/components/Item/ItemList/ItemListHeader';
  import ItemListTable from '@/components/Item/ItemList/ItemListTable';

  const projectStore = useProjectStore();

  setupData();

  const setCurrentProject = (id) => {
    projectStore.setSelectedProject(id);
  };
</script>

<template>
  <ItemListHeader
    title="Projects"
    link="/projects/new" />
  <ItemListTable
    :items="projectStore.getProjects"
    link="/projects"
    :preDeleteFtn="setCurrentProject">
    <template #table-head>
      <th class="text-left">Type</th>
    </template>
    <template #table-body="{ item }">
      <td>{{ item.type.name }}</td>
    </template>
  </ItemListTable>
</template>