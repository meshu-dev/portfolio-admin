<script setup>
  import TechnologyList from '@/components/Technology/TechnologyList';

  const route = useRoute();
  const page = route.params.page;
</script>

<template>
  <TechnologyList :page="page" />
</template>
