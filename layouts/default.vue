<script setup>
  import Header from '@/components/Layout/Header.vue';
  import SideMenu from '@/components/Layout/SideMenu.vue';
  import StatusMsg from '@/components/Layout/StatusMsg.vue';
  import ItemDeleteDialog from '@/components/Item/ItemForm/ItemDeleteDialog.vue';
</script>

<template>
  <v-app full-height>
    <div id="layout">
      <Header />
      <SideMenu />
      <div id="content">
        <StatusMsg />
        <ItemDeleteDialog />
        <div id="content-box">
          <slot />
        </div>
      </div>
    </div>
  </v-app>
</template>

<style lang="scss" scoped>
  #sidemenu {
    background-color: #FFF;
    box-shadow: #DDD 0px 2px 4px 0px;
    min-width: 300px;
    height: 100%;
    padding: 50px 20px 20px;
  }
</style>
