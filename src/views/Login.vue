<template>
  <div>
    <div id="page-header">
      <h1>Login</h1>
    </div>
    <p id="error-message">{{ user.error }}</p>
    <b-form @submit.prevent="login">
      <b-form-group
        label="Username:"
        label-for="username"
        label-cols-sm="4"
        label-cols-lg="3"
      >
        <b-form-input
          id="username"
          v-model="username"
          type="text"
          required
        ></b-form-input>
      </b-form-group>
      <b-form-group
        label="Password:"
        label-for="password"
        label-cols-sm="4"
        label-cols-lg="3"
      >
        <b-form-input
          id="password"
          v-model="password"
          type="password"
          required
        ></b-form-input>
      </b-form-group>
      <b-button pill variant="primary" type="submit">Submit </b-button>
    </b-form>
  </div>
</template>

<script>
import { mapState } from "vuex";
import store from "@/store/store";

export default {
  data() {
    return {
      username: "",
      password: ""
    };
  },
  methods: {
    async login() {
      await store.dispatch("user/login", {
        username: this.username,
        password: this.password
      });

      console.log("this.user", this.user);

      if (this.user.user.token) {
        this.$router.push({ name: "profile" });
      }
    }
  },
  computed: {
    ...mapState(["user"])
  }
};
</script>

<style scoped>
#page-header {
  overflow: hidden;
  margin: 20px 0;
}
#page-header h1 {
  float: left;
  margin: 0;
}
#page-header span {
  float: right;
}
#error-message {
  color: red;
}
</style>
