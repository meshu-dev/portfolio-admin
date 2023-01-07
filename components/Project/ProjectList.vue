<script setup>
  import { useProjectStore } from '@/stores/ProjectStore';
  import setupData from '@/composables/project/setupData';
  import ItemListHeader from '@/components/Item/ItemList/ItemListHeader';
  import ItemListTable from '@/components/Item/ItemList/ItemListTable';
  import ItemListPagination from '@/components/Item/ItemList/ItemListPagination';

  const props = defineProps({
    page: Number
  });

  const page = parseInt(props.page) || 1;

  const projectStore = useProjectStore();
  projectStore.changePage(page);

  setupData();

  const setCurrentProject = (id) => {
    projectStore.setSelectedProject(id);
  };

  const onPageChange = async (page) => {
    let link = '/';

    if (page > 1) {
      link = `projects/${page}`;
    }
    await navigateTo(link);
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
    :currentPage="page"
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
