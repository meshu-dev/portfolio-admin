<script setup>
  import { useProjectStore } from '@/stores/ProjectStore';
  import setupData from '@/composables/project/setupData';
  import {
    onTypeChange,
    onRepositoryChange,
    onTechnologyChange,
    projectFormSubmit,
    onImageUpload,
    onImageRemove
  } from '@/composables/project/utils';
  import { getRepositoryNames } from '@/composables/repository/utils';
  import { getTechnologyNames } from '@/composables/technology/utils';
  import TypeSelect from '@/components/Item/ItemForm/TypeSelect';
  import RepositorySelect from '@/components/Item/ItemForm/RepositorySelect';
  import TechnologySelect from '@/components/Item/ItemForm/TechnologySelect';

  const props = defineProps({
    id: String,
    title: String
  });

  const projectStore = useProjectStore();

  setupData(props.id);
</script>

<template>
  <ItemForm
    v-if="projectStore.getProject"
    :title="title"
    v-on:onSubmit="projectFormSubmit">
    <v-text-field
      label="Name"
      v-model="projectStore.getProject.name"
      class="item-field"
      required />
    <TypeSelect
      :typeId="projectStore.getProject.type.id"
      :onChange="onTypeChange" />
    <v-textarea
      label="Description"
      v-model="projectStore.getProject.description"
      class="item-fullfield"
      required />
    <v-text-field
      label="Url"
      v-model="projectStore.getProject.url"
      class="item-field"
      required />
    <RepositorySelect
      :selected="getRepositoryNames(projectStore.getProject.repositories)"
      :onChange="onRepositoryChange" />
    <TechnologySelect
      :selected="getTechnologyNames(projectStore.getProject.technologies)"
      :onChange="onTechnologyChange" />
    <ItemImageForm
      v-on:onUpload="onImageUpload"
      v-on:onRemove="onImageRemove" />
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
        margin: 20px 0 40px;
      }
    }
  }
</style>

