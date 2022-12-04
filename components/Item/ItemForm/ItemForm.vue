<script setup>
  import { ref } from 'vue';

  const emit = defineEmits(['onSubmit']);

  const form = ref(false);
  const name = ref(null);
  const loading = ref(false);

  const submit = () => {
    loading.value = true;

    emit('onSubmit', name);

    loading.value = false;
  };
</script>

<template>
  <v-form v-model="valid">
    <v-text-field
      v-model="name"
      label="Name"
      required />
    <v-btn
      variant="tonal"
      :loading="loading"
      @click="submit">Submit</v-btn>
  </v-form>
</template>

<style lang="scss">

</style>
