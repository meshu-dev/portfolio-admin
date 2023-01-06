<script setup>
  import { useProjectStore } from '@/stores/ProjectStore';
  import setupData from '@/composables/project/setupData';
  import ItemListHeader from '@/components/Item/ItemList/ItemListHeader';
  import ItemListTable from '@/components/Item/ItemList/ItemListTable';
  import ItemListPagination from '@/components/Item/ItemList/ItemListPagination';

  const projectStore = useProjectStore();

  setupData();

  const setCurrentProject = (id) => {
    projectStore.setSelectedProject(id);
  };

  const onPageChange = async (page) => {
    await projectStore.changePage(page);
  };
</script>

<template>
  <ItemListHeader
    title="Projects"
    link="/projects/add" />
  <ItemListTable
    :items="projectStore.getProjects"
    link="/projects"
    :preDeleteFtn="setCurrentProject">
    <template #table-head>
      <th class="type-field text-left">Type</th>
    </template>
    <template #table-body="{ item }">
      <td class="type-field">{{ item.type.name }}</td>
    </template>
  </ItemListTable>
  <ItemListPagination
    :currentPage="projectStore.getCurrentPage"
    :totalPages="projectStore.getLastPage"
    :onClickFtn="onPageChange" />
</template>

<style lang="scss">
  .type-field {
    display: table-cell;
  }

  @media (max-width: 800px) {
    .type-field {
      display: none;
    }
  }
</style>