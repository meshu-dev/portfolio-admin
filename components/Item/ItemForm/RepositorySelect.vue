<script setup>
  import { getRepositories } from '@/composables/repository/utils';
  import { useRepositorySelectStore } from '@/stores/RepositorySelectStore';

  const repositorySelectStore = useRepositorySelectStore();

  const props = defineProps({
    selected: Array,
    onChange: Function
  });

  const { selected, onChange } = toRefs(props);
  const selectedOptions = ref(selected.value);

  repositorySelectStore.setSelectedValues(selected.value);

  onMounted(async () => {
    await getRepositories();
    repositorySelectStore.setSelectedValues(selected.value);
  });
</script>

<template>
  <v-combobox
    v-model="selectedOptions"
    :items="repositorySelectStore.getOptions"
    @update:modelValue="onChange"
    label="Select repositories"
    class="item-fullfield"
    multiple
    chips />
</template>
