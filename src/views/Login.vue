<template>
  <div>
    <div id="page-header">
      <h1>Login</h1>
    </div>
    <p>{{ user.error }}</p>
    <form @submit.prevent="login">
      <FormTextField
        type="text"
        v-model="username"
        label="Username"
        placeholder="Username"
        class="field"
      />
      <FormTextField
        type="password"
        v-model="password"
        label="Password"
        placeholder="Password"
        class="field"
      />
      <button type="submit" class="button">Submit</button>
    </form>
  </div>
</template>

<script>
import { mapState } from "vuex";
import store from "@/store/store";
import FormTextField from "@/components/FormTextField.vue";

import axios from "axios";

export default {
  components: {
    FormTextField: FormTextField
  },
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
</style>
