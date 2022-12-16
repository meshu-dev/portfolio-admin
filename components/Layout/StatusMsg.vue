<script setup>
  import { useLayoutStore } from '@/stores/LayoutStore';
  const layoutStore = useLayoutStore();
</script>

<template>
  <v-alert
    v-if="layoutStore.getStatusMsg"
    id="status-msg"
    :type="layoutStore.getStatusMsg.type">
    {{ layoutStore.getStatusMsg.text }}
  </v-alert>
</template>

<style lang="scss">
  #status-msg {
    margin-bottom: 10px;
  }
</style>
