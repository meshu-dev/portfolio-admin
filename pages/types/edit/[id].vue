<script setup>
  import TypeForm from '@/components/Type/TypeForm';

  const route = useRoute();
  const id = route.params.id;
</script>

<template>
  <TypeForm :id="id" title="Edit type" />
</template>
