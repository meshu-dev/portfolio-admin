<script setup>
  import { useAuthStore } from '@/stores/AuthStore';

  const authStore = useAuthStore();

  const logout = async () => {
    await authStore.logout();
  };
</script>

<template>
  <nav v-if="authStore.isLoggedIn">
    <NuxtLink to="/">
      <div class="nav-item">Projects</div>
    </NuxtLink>
    <NuxtLink to="/prototypes">
      <div class="nav-item">Prototypes</div>
    </NuxtLink>
    <NuxtLink to="/about">
      <div class="nav-item">About</div>
    </NuxtLink>
    <NuxtLink to="/types">
      <div class="nav-item">Types</div>
    </NuxtLink>
    <NuxtLink to="/repositories">
      <div class="nav-item">Repositories</div>
    </NuxtLink>
    <NuxtLink to="/technologies">
      <div class="nav-item">Technologies</div>
    </NuxtLink>
    <span @click="logout">
      <div class="nav-item">Logout</div>
    </span>
  </nav>
</template>

<style lang="scss">
  nav {
    display: flex;
    flex-direction: column;
    margin-top: 20px;
    color: 	#48494B;

    a, span {
      margin-bottom: 10px;

      .nav-item {
        display: flex;
        padding: 12px 15px;
        border-radius: 10px;
      }
    }

    a:hover,
    span:hover {
      cursor: pointer;
      text-decoration: none;
    }

    a:not(.router-link-exact-active):hover,
    span:hover {
      .nav-item {
        background-color: #ddf1ff;
      }
    }

    a.router-link-exact-active {
      div {
        background-color: #1697F6;
        color: #FFF;
        font-weight: bold;
      }
    }

    a.router-link-exact-active {
      :hover {
        text-decoration: none;
        cursor: default;
      }
    }
  }
</style>
