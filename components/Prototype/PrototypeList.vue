<script setup>
  import { usePrototypeStore } from '@/stores/PrototypeStore';
  import setupData from '@/composables/prototype/setupData';
  import ItemListHeader from '@/components/Item/ItemList/ItemListHeader';
  import ItemListTable from '@/components/Item/ItemList/ItemListTable';
  import ItemListPagination from '@/components/Item/ItemList/ItemListPagination';

  const props = defineProps({
    page: Number
  });

  const page = parseInt(props.page) || 1;

  const prototypeStore = usePrototypeStore();
  prototypeStore.changePage(page);

  setupData();

  const setCurrentPrototype = (id) => {
    prototypeStore.setSelectedPrototype(id);
  };

  const onPageChange = async (page) => {
    let link = '/prototypes';

    if (page > 1) {
      link = `${link}/${page}`;
    }
    await navigateTo(link);
  };
</script>

<template>
  <ItemListHeader
    title="Prototypes"
    link="/prototypes/add" />
  <ItemListTable
    :items="prototypeStore.getPrototypes"
    link="/prototypes"
    :preDeleteFtn="setCurrentPrototype">
    <template #table-head>
      <th class="type-field text-left">Type</th>
    </template>
    <template #table-body="{ item }">
      <td class="type-field">{{ item.type.name }}</td>
    </template>
  </ItemListTable>
  <ItemListPagination
    :currentPage="page"
    :totalPages="prototypeStore.getLastPage"
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
