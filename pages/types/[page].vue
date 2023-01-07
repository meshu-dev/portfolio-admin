<script setup>
  import TypeList from '@/components/Type/TypeList';

  const route = useRoute();
  const page = route.params.page;
</script>

<template>
  <TypeList :page="page" />
</template>
