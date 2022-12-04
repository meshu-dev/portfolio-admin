<script setup>
  import { ref } from 'vue';
  import { toRaw } from 'vue';
  import { useDeleteDialogStore } from '@/stores/DeleteDialogStore';

  const props = defineProps({
    isEdit: Boolean,
    title: String,
    item: Object
  });
  const { item } = toRefs(props);

  const emit = defineEmits(['onSubmit', 'onDelete']);

  const name = ref(item.value ? item.value.name : '');
  const loading = ref(false);

  const submit = () => {
    runAction('onSubmit', name.value);
  };

  const runAction = async (ftn, param) => {
    loading.value = true;

    await emit(ftn, param);

    loading.value = false;
  };

  const showDeleteDialog = () => {
    const deleteDialogStore = useDeleteDialogStore();
    deleteDialogStore.open(
      'Delete type',
      'Are you sure you want to delete this type?',
      async (doDelete) => {
        console.log('FFF', doDelete);

        if (doDelete) {
          await runAction('onDelete');
        }
        deleteDialogStore.close();
      }
    );
  };

  watch(item, (newValue, oldValue) => {
    const item = toRaw(newValue);
    
    if (item) {
      name.value = item.name;
    }
  });
</script>

<template>
  <div id="item-form">
    <h1>{{ title }}</h1>
    <v-form v-model="valid">
      <v-text-field
        v-model="name"
        label="Name"
        required />
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
    max-width: 300px;

    #item-form-btns {
      display: flex;
      column-gap: 20px;
    }
  }
</style>
