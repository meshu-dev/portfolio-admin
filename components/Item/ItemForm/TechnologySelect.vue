<script setup>
  import { getTechnologies } from '@/composables/technology/utils';
  import { useTechnologySelectStore } from '@/stores/TechnologySelectStore';

  const technologySelectStore = useTechnologySelectStore();

  const props = defineProps({
    selected: Array,
    onChange: Function
  });

  onMounted(async () => {
    await getTechnologies();
  });
</script>

<template>
  <v-combobox
    v-model="props.selected"
    :items="technologySelectStore.getOptions"
    @update:modelValue="onChange"
    label="Select technologies"
    class="item-fullfield"
    multiple
    chips />
</template>
