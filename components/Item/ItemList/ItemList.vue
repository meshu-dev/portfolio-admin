<script setup>
  import ItemListHeader from '@/components/Item/ItemList/ItemListHeader';
  import ItemListContent from '@/components/Item/ItemList/ItemListContent';

  const props = defineProps({
    title: String,
    link: String,
    items: Array
  });
</script>

<template>
  <ItemListHeader
    :title="title"
    :link="`${link}/new`" />
	<ItemListContent
    :link="link"
    :items="items" />
</template>
