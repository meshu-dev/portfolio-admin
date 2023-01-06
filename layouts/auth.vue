<script setup>
  import StatusMsg from '@/components/Layout/StatusMsg.vue';
</script>

<template>
  <div id="layout">
    <div id="content">
      <StatusMsg />
      <div id="content-box">
        <slot />
      </div>
    </div>
  </div>
</template>

<style scoped>
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
  
  #logo {
    font-style: italic;
    font-size: 1.6rem;
    font-weight: bold;
    padding: 0 15px;
  }
  
  #content {
    display: flex;
    align-items: center;
    width: 100%;
    margin: 0;
    padding: 0;
  }

  #content-box {
    box-shadow: #DDD 0px 2px 4px 0px;
    background-color: #FFF;
    border-radius: 15px;
    padding: 10px 25px 20px;
    width: 500px;
    min-height: 300px;
    margin: 0 auto;
  }
</style>
