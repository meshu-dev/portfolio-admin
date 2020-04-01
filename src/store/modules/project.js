import ProjectService from "@/services/ProjectService.js";

export const namespaced = true;

export const state = {
  projects: [],
  project: {},
  totalProjects: 0,
  pageLimit: 10
};

export const mutations = {
  ADD_PROJECT(state, project) {
    state.projects.push(project);
  },
  SET_PROJECTS(state, projects) {
    state.projects = projects;
  },
  SET_TOTAL_PROJECTS(state, totalProjects) {
    state.totalProjects = totalProjects;
  },
  SET_PROJECT(state, project) {
    state.project = project;
  },
  DELETE_PROJECT(state) {
    state.project = {};
  }
};

export const actions = {
  async addProject({ commit }, project) {
    let response = await ProjectService.create(project);

    if (response.data) {
      commit("ADD_PROJECT", response.data);
    }
  },
  async fetchProjects({ commit }, { page }) {
    let offset = (parseInt(page) - 1) * state.pageLimit,
        response = await ProjectService.readRows(state.pageLimit, offset);

    if (response.headers['x-total-count']) {
      commit("SET_TOTAL_PROJECTS", response.headers['x-total-count']);
    }

    if (response.data !== undefined) {
      commit("SET_PROJECTS", response.data);
    }
  },
  async fetchProject({ commit, getters }, id) {
    let project = getters.getProjectById(id);

    if (project) {
      commit("SET_PROJECT", project);
    } else {
      let response = await ProjectService.read(id);

      if (response.data) {
        commit("SET_PROJECT", response.data);
        project = response.data;
      }
    }
    return project;
  },
  async editProject({ commit }, project) {
    project = await ProjectService.update(project.id, project);

    if (project) {
      commit("SET_PROJECT", project);
    }
  },
  async deleteProject({ commit }, id) {
    let response.data = await ProjectService.delete(id);

    if (response.data) {
      commit("DELETE_PROJECT");
    }
  },
  async clearProject({ commit }) {
    commit("SET_PROJECT", {});
  }
};

export const getters = {
  getProjectById: state => id => {
    return state.projects.find(project => project.id === id);
  }
};
