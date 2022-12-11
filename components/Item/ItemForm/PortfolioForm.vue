<script setup>
  import ItemForm from '@/components/Item/ItemForm/ItemForm';
  import TypeSelect from '@/components/Item/ItemForm/TypeSelect';
  import RepositorySelect from '@/components/Item/ItemForm/RepositorySelect';
  import TechnologySelect from '@/components/Item/ItemForm/TechnologySelect';
  import ItemImageForm from '@/components/Item/ItemForm/ItemImageForm';
  import { useTypeSelectStore } from '@/stores/TypeSelectStore';
  import { useRepositorySelectStore } from '@/stores/RepositorySelectStore';
  import { useTechnologySelectStore } from '@/stores/TechnologySelectStore';
  import { useImageStore } from '@/stores/ImageStore';
  import { getRepositoryNames } from '@/composables/repository/utils';
  import { getTechnologyNames } from '@/composables/technology/utils';

  const props = defineProps({
    title: String,
    item: Object
  });

  const { title, item } = toRefs(props);
  const itemData = toRaw(item.value);

  const emit = defineEmits(['onSubmit']);

  /*
  let repositoryOptions = [];
  let technologyOptions = [];

  if (itemData.repositories) {
    repositoryOptions = itemData.repositories.map(repository => repository.name);
  }

  if (itemData.technologies) {
    technologyOptions = itemData.technologies.map(technology => technology.name);
  } */

  const repositoryOptions = getRepositoryNames(itemData.repositories);
  const technologyOptions = getTechnologyNames(itemData.technologies);

  const onSubmit = () => {
    const currentItem = toRaw(item.value);
    const typeSelectStore = useTypeSelectStore();
    const repositorySelectStore = useRepositorySelectStore();
    const technologySelectStore = useTechnologySelectStore();
    const imageStore = useImageStore();

    const params = {
      name: currentItem.name,
      description: currentItem.description,
      typeId: typeSelectStore.getSelectedValue,
      repositoryIds: repositorySelectStore.getSelectedRepositoryIds,
      technologyIds: technologySelectStore.getSelectedTechnologyIds,
      image: imageStore.getImage
    };

    console.log('PortfolioForm!', params);

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
      :selected="repositoryOptions" />
    <TechnologySelect
      :selected="technologyOptions" />
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
