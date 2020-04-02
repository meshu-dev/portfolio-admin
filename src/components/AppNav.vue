<template>
  <nav v-if="isLoggedIn">
    <router-link to="/">Profile</router-link>
    <span>|</span>
    <router-link to="/projects">Projects</router-link>
    <span>|</span>
    <span class="link" @click="logout">
      Logout
    </span>
  </nav>
</template>

<script>
import { mapGetters } from "vuex";
import store from "@/store/store";

export default {
  methods: {
    async logout() {
      await store.dispatch("user/logout");
      this.$router.push({ name: "login" });
    }
  },
  computed: {
    ...mapGetters("user", ["isLoggedIn"])
  }
};
</script>

<style scoped>
nav {
  display: flex;
  justify-content: flex-end;
  flex-grow: 2;
}
nav a,
nav span {
  color: #FFF;
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
