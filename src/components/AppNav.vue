<template>
  <nav v-if="isLoggedIn">
    <router-link to="/">Profile</router-link> |
    <router-link to="/projects">Projects</router-link> |
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
  position: absolute;
  top: 0;
  right: 0;
}
nav a,
nav span {
  font-weight: bold;
  color: #2c3e50;
  padding: 0 10px;
}
nav a.router-link-exact-active {
  color: #42b983;
}
</style>
