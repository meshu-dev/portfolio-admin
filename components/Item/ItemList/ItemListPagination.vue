<script setup>
  const props = defineProps({
    currentPage: Number,
    totalPages: Number,
    onClickFtn: Function
  });

  const page = ref(props.currentPage);

  watch(page, (newValue, oldValue) => {
    if (props.onClickFtn && newValue != oldValue) {
      props.onClickFtn(newValue);
    }
  });
</script>

<template>
  <div v-if="props.totalPages > 1">
    <v-pagination
      v-model="page"
      :length="props.totalPages" />
  </div>
</template>
