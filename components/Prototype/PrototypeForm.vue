<script setup>
  import { usePrototypeStore } from '@/stores/PrototypeStore';
  import setupData from '@/composables/prototype/setupData';
  import {
    onTypeChange,
    onRepositoryChange,
    onTechnologyChange,
    prototypeFormSubmit,
    onImageUpload,
    onImageRemove
  } from '@/composables/prototype/utils';
  import { getRepositoryNames } from '@/composables/repository/utils';
  import { getTechnologyNames } from '@/composables/technology/utils';
  import TypeSelect from '@/components/Item/ItemForm/TypeSelect';
  import RepositorySelect from '@/components/Item/ItemForm/RepositorySelect';
  import TechnologySelect from '@/components/Item/ItemForm/TechnologySelect';

  const props = defineProps({
    id: String,
    title: String
  });

  const prototypeStore = usePrototypeStore();

  setupData(props.id);
</script>

<template>
  <ItemForm
    v-if="prototypeStore.getPrototype"
    :title="title"
    v-on:onSubmit="prototypeFormSubmit">
    <v-text-field
      label="Name"
      v-model="prototypeStore.getPrototype.name"
      class="item-field"
      required />
    <TypeSelect
      :typeId="prototypeStore.getPrototype.type.id"
      :onChange="onTypeChange" />
    <v-textarea
      label="Description"
      v-model="prototypeStore.getPrototype.description"
      class="item-fullfield"
      required />
    <RepositorySelect
      :selected="getRepositoryNames(prototypeStore.getPrototype.repositories)"
      :onChange="onRepositoryChange" />
    <TechnologySelect
      :selected="getTechnologyNames(prototypeStore.getPrototype.technologies)"
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
