import ProfileService from "@/services/ProfileService.js";

export const namespaced = true;

export const state = {
  profile: {}
};

export const mutations = {
  SET_PROFILE(state, profile) {
    state.profile = profile;
  }
};

export const actions = {
  async fetchProfile({ commit }, name) {
    let profile = await ProfileService.readByName(name);

    if (profile) {
      commit("SET_PROFILE", profile);
    }
  },
  async saveProfile({ commit }, profile) {
    profile = await ProfileService.update(profile._id, profile);

    if (profile) {
      commit("SET_PROFILE", profile);
    }
  }
};

export const getters = {};
