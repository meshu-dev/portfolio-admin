<script setup>
  import AppNav from '@/components/AppNav.vue';
</script>

<template>
  <div id="desktop-sidemenu" class="sidemenu">
    <router-link to="/" id="logo">
      <span>Portfolio Admin</span>
    </router-link>
    <AppNav />
  </div>
</template>

<style lang="scss">
  #desktop-sidemenu {
    display: block;
  }

  .sidemenu {
    background-color: #FFF;
    box-shadow: #DDD 0px 2px 4px 0px;
    min-width: 300px;
    height: auto;
    padding: 50px 20px 20px;
  }

  @media (max-width: 1400px) {
    #desktop-sidemenu {
      display: none;
    }
  }
</style>
