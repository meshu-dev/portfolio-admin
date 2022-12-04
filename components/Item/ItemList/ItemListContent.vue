<script setup>
  import ItemView from '@/components/Item/ItemView';

  const props = defineProps({
    items: Array,
    link: String
  });
</script>

<template>
  <div v-if="items">
    <div id="item-list">
      <ItemView
        v-for="item in items"
        :key="item.id"
        :item="item"
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
</style>
