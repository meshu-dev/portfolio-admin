<script setup>
  import { useTypeStore } from '@/stores/TypeStore';
  import setupData from '@/composables/type/setupData';
  import ItemListHeader from '@/components/Item/ItemList/ItemListHeader';
  import ItemListTable from '@/components/Item/ItemList/ItemListTable';

  const typeStore = useTypeStore();

  setupData();

  const setCurrentType = (id) => {
    typeStore.setSelectedType(id);
  };
</script>

<template>
  <ItemListHeader
    title="Types"
    link="/types/new" />
  <ItemListTable
    :items="typeStore.getTypes"
    link="/types"
    :preDeleteFtn="setCurrentType" />
</template>