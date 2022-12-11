<script setup>
  import ItemForm from '@/components/Item/ItemForm/ItemForm';
  import TypeSelect from '@/components/Item/ItemForm/TypeSelect';
  import RepositorySelect from '@/components/Item/ItemForm/RepositorySelect';
  import TechnologySelect from '@/components/Item/ItemForm/TechnologySelect';
  import ItemImageForm from '@/components/Item/ItemForm/ItemImageForm';
  import { getRepositoryValues, getTechnologyValues, getFormParams } from '@/composables/portfolioform/utils';

  const props = defineProps({
    title: String,
    item: Object
  });

  const { title, item } = toRefs(props);
  const emit = defineEmits(['onSubmit']);

  const onSubmit = () => {
    const params = getFormParams(item);
    emit('onSubmit', params);
  };
</script>

<template>
  <ItemForm
    v-if="item"
    :title="title"
    v-on:onSubmit="onSubmit">
    <v-text-field
      label="Name"
      v-model="item.name"
      class="item-field"
      required />
    <TypeSelect
      :typeId="item.type.id" />
    <v-textarea
      label="Description"
      v-model="item.description"
      class="item-fullfield"
      required />
    <RepositorySelect
      :selected="getRepositoryValues(item)" />
    <TechnologySelect
      :selected="getTechnologyValues(item)" />
    <ItemImageForm
      v-if="item.images && item.images.length > 0"
      :image="item.images[0]" />
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
