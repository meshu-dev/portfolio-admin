<script setup>
  import { useTypeStore } from '@/stores/TypeStore';
  import { getTypes } from '@/composables/type/utils';

  const typeStore = useTypeStore();

  onMounted(async () => {
    await getTypes();
  });  
</script>

<template>
  <v-select
    label="Select type"
    class="item-field"
    :items="typeStore.getTypeNames" />
</template>
