<script setup>
  import { ref } from 'vue';
  
  const props = defineProps({
    title: String
  });

  const emit = defineEmits(['onSubmit']);
  const loading = ref(false);  

  const submit = () => {
    runAction('onSubmit');
  };

  const runAction = async (ftn, param) => {
    loading.value = true;

    await emit(ftn);

    loading.value = false;
  };
</script>

<template>
  <div id="item-form">
    <h1>{{ title }}</h1>
    <v-form>
      <slot />
      <div id="item-form-btns">
        <v-btn
          variant="tonal"
          :loading="loading"
          @click="submit">Submit</v-btn>
      </div>
    </v-form>
  </div>
</template>

<style lang="scss">
  #item-form {
    form {
      max-width: 300px;
    }

    #item-form-btns {
      display: flex;
      column-gap: 20px;
    }
  }
</style>
