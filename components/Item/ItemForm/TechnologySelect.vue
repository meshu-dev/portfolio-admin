<script setup>
  import { getTechnologies } from '@/composables/technology/utils';
  import { useTechnologySelectStore } from '@/stores/TechnologySelectStore';

  const technologySelectStore = useTechnologySelectStore();

  const props = defineProps({
    selected: Array
  });

  const { selected } = toRefs(props);
  const selectedOptions = ref(selected.value);

  const emit = defineEmits(['onChange']);

  technologySelectStore.setSelectedValues(selected.value);

  onMounted(async () => {
    await getTechnologies();
    technologySelectStore.setSelectedValues(selected.value);
  });

  const onChange = (values) => {
    technologySelectStore.setSelectedValues(values);
  };
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
