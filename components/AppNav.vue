<script setup>
  const isLoggedIn = true;

  const logout = () => {
    his.$router.push({ name: "login" });
  };
</script>

<template>
  <nav v-if="isLoggedIn">
    <NuxtLink to="/">Profile</NuxtLink>
    <span>|</span>
    <NuxtLink to="/prototypes">Prototypes</NuxtLink>
    <span>|</span>
    <NuxtLink to="/about">About</NuxtLink>
    <span>|</span>
    <NuxtLink to="/types">Types</NuxtLink>
    <span>|</span>
    <NuxtLink to="/repositories">Repositories</NuxtLink>
    <span>|</span>
    <NuxtLink to="/technologies">Technologies</NuxtLink>
    <span>|</span>
    <span class="link" @click="logout">
      Logout
    </span>
  </nav>
</template>

<style scoped>
  nav {
    display: flex;
    justify-content: flex-end;
    flex-grow: 2;
  }
  nav a,
  nav span {
    color: #fff;
    text-align: center;
    flex-basis: 3rem;
    flex-shrink: 1;
  }
  nav a.router-link-exact-active {
    color: #42b983;
  }
  nav a.router-link-exact-active:hover {
    text-decoration: none;
    cursor: default;
  }
</style>
