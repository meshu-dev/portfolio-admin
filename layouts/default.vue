<script setup>
  import SideMenu from '@/components/Layout/SideMenu.vue';
  import StatusMsg from '@/components/Layout/StatusMsg.vue';
  import ItemDeleteDialog from '@/components/Item/ItemForm/ItemDeleteDialog.vue';
</script>

<template>
  <div id="layout">
    <SideMenu />
    <div id="content">
      <StatusMsg />
      <ItemDeleteDialog />
      <div id="content-box">
        <slot />
      </div>
    </div>
  </div>
</template>

<style>
  html, body, #__nuxt {
    height: 100%;
  }

  body {
    background-color: #F1F1F1;
    font-size: 100%;
    margin: 0;
  }

  a,
  .link {
    text-decoration: none;
    color: #35495d;
  }
  
  a:hover,
  .link:hover {
    text-decoration: underline;
    cursor: pointer;
  }
  
  .btn {
    max-height: 46px;
  }
  
  .btn-primary {
    color: #fff;
    background-color: #35495d;
    border-color: #35495d;
  }
  
  .btn-primary:hover {
    background-color: #4fc08d;
    border-color: #4fc08d;
  }
  
  h1 {
    font-size: 3rem;
    margin-bottom: 20px;
  }
  
  .modal-header {
    border-bottom: none;
  }
  
  #app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #4f5959;
  }

  #layout {
    display: flex;
    flex-direction: row;
    height: 100%;
  }
  
  #sidemenu {
    background-color: #FFF;
    box-shadow: #DDD 0px 2px 4px 0px;
    min-width: 300px;
    height: 100%;
    padding: 50px 20px 20px;
  }
  
  #logo {
    font-style: italic;
    font-size: 1.6rem;
    font-weight: bold;
    padding: 0 15px;
  }
  
  #content {
    width: 100%;
    margin-top: 30px;
    padding: 0 60px;
  }

  #content-box {
    box-shadow: #DDD 0px 2px 4px 0px;
    background-color: #FFF;
    border-radius: 15px;
    padding: 10px 25px 20px;
    width: 1000px;
    min-height: 600px;
    margin: 0 auto;
  }
</style>
