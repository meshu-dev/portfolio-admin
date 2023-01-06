<script setup>
  import { usePrototypeStore } from '@/stores/PrototypeStore';
  import setupData from '@/composables/prototype/setupData';
  import ItemListHeader from '@/components/Item/ItemList/ItemListHeader';
  import ItemListTable from '@/components/Item/ItemList/ItemListTable';
  import ItemListPagination from '@/components/Item/ItemList/ItemListPagination';

  const prototypeStore = usePrototypeStore();

  setupData();

  const setCurrentPrototype = (id) => {
    prototypeStore.setSelectedPrototype(id);
  };

  const onPageChange = async (page) => {
    await prototypeStore.changePage(page);
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
    :currentPage="prototypeStore.getCurrentPage"
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
