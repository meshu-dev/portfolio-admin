<script setup>
  import AppNav from '@/components/AppNav.vue';

  const isMenuOpen = ref(false);
</script>

<template>
  <div id="header-bar">
    <v-app-bar :elevation="2" class="bg-primary">
      <template v-slot:prepend>
        <v-app-bar-nav-icon
          id="header-bar-menubtn"
          @click.stop="isMenuOpen = !isMenuOpen" />
      </template>
      <v-app-bar-title>Portfolio Admin</v-app-bar-title>
    </v-app-bar>
    <v-navigation-drawer
      v-model="isMenuOpen"
      width="300">
      <div id="mobile-sidemenu" class="sidemenu">
        <AppNav />
      </div>
    </v-navigation-drawer>
  </div>
</template>

<style lang="scss">
  #header-bar {
    display: none;

    .v-navigation-drawer {
      margin-top: 0;
    }
  }

  #mobile-sidemenu {
    margin: 0;
    height: 100%;
  }

  .sidemenu {
    background-color: #FFF;
    box-shadow: #DDD 0px 2px 4px 0px;
    min-width: 300px;
    height: 100%;
    padding: 50px 20px 20px;
  }

  @media (max-width: 1400px) {
    #header-bar {
      display: block;
    }
  }
</style>
