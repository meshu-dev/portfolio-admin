<script setup>
  import { onMounted } from 'vue';
  import { usePrototypeStore } from '@/stores/PrototypeStore';
  import ItemList from '@/components/Item/ItemList';

  const prototypeStore = usePrototypeStore();
  
  const getPrototypes = () => {
    return prototypeStore.getPrototypes;
  };

  onMounted(async () => {
    await prototypeStore.fetchPrototypes();
  });
</script>

<template>
	<div>
    <ItemList link="prototypes" :items="getPrototypes()" />
	</div>
</template>