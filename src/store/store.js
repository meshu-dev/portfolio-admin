import Vue from "vue";
import Vuex from "vuex";
import * as profile from "@/store/modules/profile.js";
import * as project from "@/store/modules/project.js";
import * as user from "@/store/modules/user.js";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    profile,
    project,
    user
  },
  state: {},
  mutations: {},
  actions: {}
});
