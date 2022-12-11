<script setup>
  import { ref } from 'vue';
  import { useDeleteDialogStore } from '@/stores/DeleteDialogStore';

  const props = defineProps({
    title: String
  });

  const emit = defineEmits(['onSubmit']);
  const loading = ref(false);  

  const submit = () => {
    runAction('onSubmit');
  };

  const runAction = async (ftn, param) => {
    loading.value = true;

    console.log('BING!');

    await emit(ftn);

    loading.value = false;
  };

  const showDeleteDialog = () => {
    const deleteDialogStore = useDeleteDialogStore();
    deleteDialogStore.open();
  };
</script>

<template>
  <div id="item-form">
    <h1>{{ title }}</h1>
    <v-form>
      <slot />
      <div id="item-form-btns">
        <v-btn
          variant="tonal"
          :loading="loading"
          @click="submit">Submit</v-btn>
        <v-btn
          variant="tonal"
          :loading="loading"
          @click="showDeleteDialog">Delete</v-btn>
      </div>
    </v-form>
  </div>
</template>

<style lang="scss">
  #item-form {
    form {
      max-width: 300px;
    }

    #item-form-btns {
      display: flex;
      column-gap: 20px;
    }
  }
</style>
