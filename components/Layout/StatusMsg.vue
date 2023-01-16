<script setup>
  import { useLayoutStore } from '@/stores/LayoutStore';
  const layoutStore = useLayoutStore();
</script>

<template>
  <v-alert
    v-if="layoutStore.getStatusMsg"
    id="status-msg"
    :type="layoutStore.getStatusMsg.type">
    <template v-for="(msg, index) in layoutStore.getStatusMsg.text">
      <span>{{ msg }}</span>
      <br v-if="layoutStore.getStatusMsg.text.length > 1" />
    </template>
  </v-alert>
</template>

<style lang="scss">
  #status-msg {
    margin-bottom: 10px;
  }
</style>
