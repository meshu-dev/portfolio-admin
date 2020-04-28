<template>
  <div id="app">
    <header id="header-main">
      <div id="header-content">
        <router-link to="/" id="logo">
          <span>Portfolio Admin</span>
        </router-link>
        <AppNav />
      </div>
    </header>
    <div id="content">
      <router-view />
    </div>
  </div>
</template>

<script>
import AppNav from "./components/AppNav";

export default {
  components: { AppNav }
}
</script>

<style>
  body {
    font-size: 100%;
    margin: 0;
  }
  a,
  .link {
    text-decoration: none;
    color: #35495D;
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
    background-color: #35495D;
    border-color: #35495D;
  }
  .btn-primary:hover {
    background-color: #4fc08d;
    border-color: #4fc08d;
  }
  h1 {
    font-size: 3rem;
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
  #header-main {
    background-color: #35495D;
    font-size: 150%;
    box-shadow: 0 2px 8px #000;
  }
  #header-content {
    flex-direction: row;
    max-width: 1000px;
    padding: 1rem 0;
    margin: 0 auto;
    display: flex;
  }
  #logo {
    font-style: italic;
    font-size: 1.6rem;
    font-weight: bold;
    flex-grow: 1;
    color: #FFF;
  }
  #content {
    max-width: 1000px;
    margin: 2rem auto 0;
  }
</style>
