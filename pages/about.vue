<script setup>
  import { useAboutStore } from '@/stores/AboutStore';
  import { aboutFormSubmit } from '@/composables/about/utils';
  import setupData from '@/composables/about/setupData';

  const aboutStore = useAboutStore();

  setupData();
</script>

<template>
  <div>
    <h1>About</h1>
    <div v-if="aboutStore.getAbout">
      <v-textarea
        label="Enter text for about page"
        v-model="aboutStore.getAbout.text"
        no-resize
        rows="10" />
      <v-btn
        variant="tonal"
        @click="aboutFormSubmit">Submit</v-btn>
    </div>
  </div>
</template>