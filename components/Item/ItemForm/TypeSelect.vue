<script setup>
  import { getTypes } from '@/composables/type/utils';
  import { useTypeSelectStore } from '@/stores/TypeSelectStore';

  const typeSelectStore = useTypeSelectStore();

  const props = defineProps({
    typeId: Number,
    onChange: Function
  });

  const { typeId, onChange } = toRefs(props);
  const selectedOption = ref(null);
  
  const setValues = (typeId) => {
    typeSelectStore.setSelectedValue(typeId);
    selectedOption.value = typeSelectStore.getSelectedOption;
  };

  setValues(typeId.value);

  onMounted(async () => {
    await getTypes();
    setValues(typeId.value);
  });
</script>

<template>
  <v-select
    v-model="selectedOption"
    :items="typeSelectStore.getOptions"
    @update:modelValue="onChange"
    label="Select type"
    class="item-field" />
</template>
