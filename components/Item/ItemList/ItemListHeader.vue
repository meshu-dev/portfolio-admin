<script setup>
  const props = defineProps({
    title: String,
    link: String
  });

  const goToAddPage = async (link) => {
    await navigateTo(link);
  };
</script>

<template>
  <div id="item-list-header">
    <h1>{{ title }}</h1>
    <v-btn
      variant="tonal"
      @click="goToAddPage(link)">
      Add
    </v-btn>
  </div>
</template>

<style lang="scss">
  #item-list-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }
</style>