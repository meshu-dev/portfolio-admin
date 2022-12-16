<script setup>
  import { useTypeStore } from '@/stores/TypeStore';
  import setupData from '@/composables/type/setupData';
  import ItemList from '@/components/Item/ItemList/ItemList';

  const typeStore = useTypeStore();

  setupData();
</script>

<template>
	<ItemList
    title="Types"
    link="types"
    :items="typeStore.getTypes" />
</template>