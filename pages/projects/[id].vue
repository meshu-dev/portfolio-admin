<script setup>
  import { useProjectStore } from '@/stores/ProjectStore';
  import { projectFormSubmit } from '@/composables/project/utils';
  import setupData from '@/composables/project/setupData';
  import ItemForm from '@/components/Item/ItemForm/ItemForm';
  import TypeSelect from '@/components/Item/ItemForm/TypeSelect';
  import TechnologySelect from '@/components/Item/ItemForm/TechnologySelect';
  import ItemImageForm from '@/components/Item/ItemForm/ItemImageForm';

  const route = useRoute();
  const id = route.params.id;
  const isEdit = id != 'new' ? true : false;

  const projectStore = useProjectStore();
  //const project = ref(projectStore.getProject);

  setupData(id);
</script>

<template>
  <ItemForm
    v-if="projectStore.getProject"
    :title="isEdit ? 'Edit project' : 'Add project'"
    v-on:onSubmit="projectFormSubmit">
    <v-text-field
      label="Name"
      v-model="projectStore.getProject.name"
      required />
    <TypeSelect
      v-if="projectStore.getPrototype.type"
      :type="projectStore.getProject.type.name" />
    <TechnologySelect />
    <ItemImageForm
      :image="projectStore.getProject.image" />
  </ItemForm>
</template>

<style lang="scss">
  #item-form {
    form {
      max-width: 800px;

      .item-field {
        max-width: 300px;
      }

      .item-fullfield {
        max-width: 500px;
      }
      
      #item-form-btns {
        margin-top: 20px;
      }
    }
  }
</style>
