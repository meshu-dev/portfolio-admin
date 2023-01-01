<script setup>
  import ItemView from '@/components/Item/ItemView';
  import ItemListTable from '@/components/Item/ItemList/ItemListTable';

  const props = defineProps({
    items: Array,
    link: String
  });
</script>

<template>
  <div>
    <div v-if="items.length > 0"
      id="item-list">
      <ItemListTable
        :items="items"
        :link="link" />
    </div>
    <div v-if="items.length == 0">
      None available
    </div>
  </div>
</template>

<style lang="scss">
  #item-list {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 30px;

    a {
      width: 312px;
    }
  }

  .actions {
    display: flex;
    gap: 20px;
    margin-top: 11px;
  }
</style>
