<script setup>
  import PrototypeList from '@/components/Prototype/PrototypeList';

  const route = useRoute();
  const page = route.params.page;
</script>

<template>
  <PrototypeList :page="page" />
</template>
