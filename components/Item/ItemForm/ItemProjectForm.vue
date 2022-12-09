<script setup>
  import { ref } from 'vue';
  import { toRaw } from 'vue';
  import { useTypeStore } from '@/stores/TypeStore';
  import { useTechnologyStore } from '@/stores/TechnologyStore';
  import { useDeleteDialogStore } from '@/stores/DeleteDialogStore';
  import ItemProjectImageForm from '@/components/Item/ItemForm/ItemProjectImageForm';

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

  fetchTypes();
  fetchTechnologies();

  const typeStore = useTypeStore();
  const technologyStore = useTechnologyStore();
</script>

<template>
  <div
    v-if="item"
    id="item-project-form">
    <h1>{{ title }}</h1>
    <div id="item-content">
      <v-form v-model="valid">
        <v-select
          label="Select type"
          class="item-field"
          :items="typeStore.getTypeNames" />
        <v-text-field
          v-model="name"
          label="Name"
          class="item-field"
          required />
        <v-combobox
          :items="technologyStore.getTechnologyNames"
          label="Select technologies"
          class="item-fullfield"
          multiple
          chips />
        <ItemProjectImageForm
          :image="item.image" />
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
    <div>

    </div>
  </div>
</template>

<style lang="scss">
  #item-project-form {
    #item-content {
      form {
        .item-field {
          max-width: 300px;
        }

        .item-fullfield {
          max-width: 500px;
        }
      
        #item-form-btns {
          display: flex;
          column-gap: 20px;
          margin-top: 20px;
        }
      }
    }
  }
</style>
