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

  const route = useRoute();
  const id = route.params.id;
  const isEdit = id != 'new' ? true : false;

  const projectStore = useProjectStore();
  const project = ref(projectStore.getProject);

  setupData(id);
</script>

<template>
  <ItemForm
    v-if="project"
    :title="isEdit ? 'Edit project' : 'Add project'"
    v-on:onSubmit="projectFormSubmit">
    <v-text-field
      label="Name"
      v-model="project.name"
      class="item-field"
      required />
    <TypeSelect
      :typeId="project.type.id"
      :onChange="onTypeChange" />
    <v-textarea
      label="Description"
      v-model="project.description"
      class="item-fullfield"
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
