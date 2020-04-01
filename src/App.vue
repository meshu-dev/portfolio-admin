<template>
  <div id="app">
    <header>
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
  .button {
    display: inline-block;
    padding: 0.5em 1.2em;
    margin: 0 0.1em 0.1em 0;
    border: 0.16em solid rgba(255,255,255,0);
    border-radius: 2em;
    box-sizing: border-box;
    text-decoration: none;
    font-family: 'Roboto',sans-serif;
    font-weight: 300;
    color: #000;
    text-shadow: 0 0.04em 0.04em rgba(0,0,0,0.35);
    text-align:center;
    transition: all 0.2s;
    background-color: #42b983;
  }
  .button:hover {
    border-color: rgba(255,255,255,1);
    cursor: pointer;
  }
  .btn {
    max-height: 40px;
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
    color: #35495D;
  }
  header {
    background-color: #42b983;
    font-size: 150%;
    box-shadow: 0 2px 8px #35495D;
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
