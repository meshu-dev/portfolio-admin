<script setup>
  import AppNav from '@/components/AppNav.vue';
</script>

<template>
  <div id="sidemenu">
    <router-link to="/" id="logo">
      <span>Portfolio Admin</span>
    </router-link>
    <AppNav />
  </div>
</template>

<style lang="scss">
  #sidemenu {
    background-color: #FFF;
    box-shadow: #DDD 0px 2px 4px 0px;
    min-width: 300px;
    height: 100%;
    padding: 50px 20px 20px;
  }
</style>
