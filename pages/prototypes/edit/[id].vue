<script setup>
  import PrototypeForm from '@/components/Prototype/PrototypeForm';

  const route = useRoute();
  const id = route.params.id;
</script>

<template>
  <PrototypeForm :id="id" title="Edit prototype" />
</template>
