<script setup>
  import { useTechnologyStore } from '@/stores/TechnologyStore';
  import { getTechnologies } from '@/composables/technology/utils';

  const technologyStore = useTechnologyStore();

  onMounted(async () => {
    await getTechnologies();
  });  
</script>

<template>
  <v-combobox
    :items="technologyStore.getTechnologyNames"
    label="Select technologies"
    class="item-fullfield"
    multiple
    chips />
</template>
