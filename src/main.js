import Vue from "vue";
import App from "./App.vue";
import store from "./store/store";
import router from "./router";

import CapitaliseFilter from "./filters/capitalise";

Vue.filter("capitalise", CapitaliseFilter);

Vue.config.productionTip = false;

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
