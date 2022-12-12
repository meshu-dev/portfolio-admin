<script setup>
  import { getTechnologies } from '@/composables/technology/utils';
  import { useTechnologySelectStore } from '@/stores/TechnologySelectStore';

  const technologySelectStore = useTechnologySelectStore();

  const props = defineProps({
    selected: Array,
    onChange: Function
  });

  const { selected, onChange } = toRefs(props);
  const selectedOptions = ref(selected.value);

  technologySelectStore.setSelectedValues(selected.value);

  onMounted(async () => {
    await getTechnologies();
    technologySelectStore.setSelectedValues(selected.value);
  });
</script>

<template>
  <v-combobox
    v-model="selectedOptions"
    :items="technologySelectStore.getOptions"
    @update:modelValue="onChange"
    label="Select technologies"
    class="item-fullfield"
    multiple
    chips />
</template>
