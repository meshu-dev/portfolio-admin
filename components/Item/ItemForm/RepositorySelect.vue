<script setup>
  import { getRepositories } from '@/composables/repository/utils';
  import { useRepositorySelectStore } from '@/stores/RepositorySelectStore';

  const repositorySelectStore = useRepositorySelectStore();

  const props = defineProps({
    selected: Array
  });

  const { selected } = toRefs(props);
  const selectedOptions = ref(selected.value);

  const emit = defineEmits(['onChange']);

  repositorySelectStore.setSelectedValues(selected.value);

  onMounted(async () => {
    await getRepositories();
    repositorySelectStore.setSelectedValues(selected.value);
  });

  const onChange = (values) => {
    repositorySelectStore.setSelectedValues(values);
  };
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
