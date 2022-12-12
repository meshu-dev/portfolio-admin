<script setup>
  import { getTypes } from '@/composables/type/utils';
  import { useTypeSelectStore } from '@/stores/TypeSelectStore';

  const typeSelectStore = useTypeSelectStore();

  const props = defineProps({
    typeId: Number,
    onChange: Function
  });

  onMounted(async () => {
    await getTypes();
  });
</script>

<template>
  <v-select
    v-model="props.typeId"
    :items="typeSelectStore.getOptions"
    @update:modelValue="onChange"
    label="Select type"
    class="item-field" />
</template>
