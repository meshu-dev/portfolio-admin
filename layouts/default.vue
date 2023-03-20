<script setup>
  import Header from '@/components/Layout/Header.vue';
  import SideMenu from '@/components/Layout/SideMenu.vue';
  import StatusMsg from '@/components/Layout/StatusMsg.vue';
  import ItemDeleteDialog from '@/components/Item/ItemForm/ItemDeleteDialog.vue';

  let isLoggedIn = false;

  if (process.client) {
    isLoggedIn = localStorage && localStorage.getItem('isLoggedIn') === 'true';
  }
</script>

<template>
  <v-app full-height>
    <div id="page-layout" class="layout">
      <template v-if="isLoggedIn">
        <Header />
        <SideMenu />
        <div id="page-content-wrapper" class="content-box-wrapper">
          <ItemDeleteDialog />
          <div id="page-content">
            <StatusMsg />
            <div class="content-box">
              <slot />
            </div>
          </div>
        </div>
      </template>
    </div>
  </v-app>
</template>

<style lang="scss" scoped>
  html {
    overflow: overlay;
  }
</style>

<style lang="scss">
  #page-layout {
    height: auto;

    #page-content-wrapper {
      margin-top: 30px;
      padding: 0 60px;
      width: calc(100vw - 300px);
    
      #page-content {
        width: 1000px;
        min-height: 600px;
        margin: 0 auto 30px;
      }
    }
  }

  @media (max-width: 1400px) {
    #page-layout {
      #page-content-wrapper {
        margin-top: 65px;
        padding: 30px;
        width: 100vw;
    
        #page-content {
          width: 100%;
        }
      }
    }
  }
</style>