<script setup>
  import { getRepositories } from '@/composables/repository/utils';
  import { useRepositorySelectStore } from '@/stores/RepositorySelectStore';

  const repositorySelectStore = useRepositorySelectStore();

  const props = defineProps({
    selected: Array,
    onChange: Function
  });

  onMounted(async () => {
    await getRepositories();
  });
</script>

<template>
  <v-combobox
    v-model="props.selected"
    :items="repositorySelectStore.getOptions"
    @update:modelValue="onChange"
    label="Select repositories"
    class="item-fullfield"
    multiple
    chips />
</template>
