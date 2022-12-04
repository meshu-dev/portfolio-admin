<script setup>
  import { ref } from 'vue';
  import { toRaw } from 'vue';

  const props = defineProps({
    isEdit: Boolean,
    title: String,
    item: Object
  });
  const { item } = toRefs(props);

  const emit = defineEmits(['onSubmit']);

  const name = ref(item.value ? item.value.name : '');
  const loading = ref(false);

  const submit = () => {
    loading.value = true;

    console.log('NAME', name, name.value);
    emit('onSubmit', name.value);

    loading.value = false;
  };

  watch(item, (newValue, oldValue) => {
    const item = toRaw(newValue);
    
    if (item) {
      name.value = item.name;
    }
  });
</script>

<template>
  <div id="item-form">
    <h1>{{ title }}</h1>
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
  </div>
</template>

<style lang="scss">
  #item-form {
    max-width: 300px;
  }
</style>
