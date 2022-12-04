<script setup>
  import { useTypeStore } from '@/stores/TypeStore';
  import ItemList from '@/components/Item/ItemList/ItemList';

  const typeStore = useTypeStore();

  fetchTypes();
</script>

<template>
	<ItemList
    title="Types"
    link="types"
    :items="typeStore.getTypes" />
</template>