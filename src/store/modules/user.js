import UserService from "@/services/UserService.js";
import ApiClient from "@/services/ApiClient.js";

export const namespaced = true;

export const state = {
  user: null,
  error: null
};

export const mutations = {
  SET_USER(state, user) {
    state.user = user;
  },
  SET_USER_DATA(state, userData) {
    if (userData.token) {
      localStorage.setItem("user", JSON.stringify(userData));
      state.user = userData;
    } else {
      state.error = userData.message;
    }

    ApiClient.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${userData.token}`;
  },
  CLEAR_USER(state) {
    localStorage.removeItem("user");
    state.user = null;
  }
};

export const actions = {
  async login({ commit }, { username, password }) {
    let response = await UserService.login(username, password);

    console.log("response.data", response.data);

    commit("SET_USER_DATA", response.data);
  },
  logout({ commit }) {
    commit("CLEAR_USER");
  },
  fetchUser({ commit }) {
    let userData = JSON.parse(localStorage.getItem("user"));

    if (userData) {
      commit("SET_USER", userData);
    }
  }
};

export const getters = {
  isLoggedIn: state => {
    return state.user !== null && state.user.token ? true : false;
  }
};
