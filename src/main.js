import Vue from "vue";
import store from "./store/store";
import router from "./router";

import BootstrapVue from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

import App from "./App.vue";

import CapitaliseFilter from "./filters/capitalise";

Vue.filter("capitalise", CapitaliseFilter);

Vue.config.productionTip = false;

Vue.use(BootstrapVue);

new Vue({
  router,
  store,
  async created() {
    await store.dispatch("user/fetchUser");
  },
  render: h => {
    return h(App);
  }
}).$mount("#app");
