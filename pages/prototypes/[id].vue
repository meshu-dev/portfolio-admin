<script setup>
  import { usePrototypeStore } from '@/stores/PrototypeStore';
  import setupData from '@/composables/prototype/setupData';
  import { setParamsToPrototype, prototypeFormSubmit } from '@/composables/prototype/utils';
  import PortfolioForm from '@/components/Item/ItemForm/PortfolioForm';

  const route = useRoute();
  const id = route.params.id;
  const isEdit = id != 'new' ? true : false;

  const prototypeStore = usePrototypeStore();
  const prototype = ref(prototypeStore.getPrototype);

  setupData(id);

  const onSubmit = async (params) => {
    setParamsToPrototype(params);
    await prototypeFormSubmit();
    
    console.log('Burger', params);
  };
</script>

<template>
  <PortfolioForm
    v-if="prototype"
    :title="isEdit ? 'Edit prototype' : 'Add prototype'"
    :item="prototype"
    v-on:onSubmit="onSubmit" />
</template>
