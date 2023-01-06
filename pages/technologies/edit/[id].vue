<script setup>
  import TechnologyForm from '@/components/Technology/TechnologyForm';

  const route = useRoute();
  const id = route.params.id;
</script>

<template>
  <TechnologyForm :id="id" title="Edit technology" />
</template>
