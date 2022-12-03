<script setup>
  const props = defineProps({
    item: Object,
    link: String
  });
</script>

<template>
  <NuxtLink :to="`${link}/${item.id}`">
    <v-card
      class="mx-auto"
      max-width="344">
      <v-img
        :src="item.image.url"
        height="200px"
        cover />
      <v-card-title>
        {{ item.name }}
      </v-card-title>
    </v-card>
  </NuxtLink>
</template>

<style scoped>

</style>
