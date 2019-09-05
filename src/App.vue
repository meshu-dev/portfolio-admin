<template>
  <div id="app">
    <header>
      <div id="logo">
        <router-link to="/">
          <img src="./assets/logo.png" />
        </router-link>
        <span>Portfolio Admin</span>
      </div>
      <AppNav />
    </header>
    <router-view />
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
}
a,
.link {
  text-decoration: none;
  color: #42b983;
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
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  max-width: 1000px;
  color: #2c3e50;
  margin: 0 auto;
}
#logo {
  position: absolute;
  display: flex;
  left: 0;
}
#logo img {
  width: 50px;
  height: 50px;
}
#logo span {
  text-align: left;
  margin: 0 0 0 10px;
}
header {
  position: relative;
  min-height: 50px;
  font-size: 150%;
}
</style>
