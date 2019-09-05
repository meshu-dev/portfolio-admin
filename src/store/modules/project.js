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
    //state.project = project;
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
    project = await ProjectService.create(project);

    if (project) {
      commit("ADD_PROJECT", project);
    }
  },
  async fetchProjects({ commit }, { page }) {
    let offset = (parseInt(page) - 1) * state.pageLimit,
      data = await ProjectService.readRows(state.pageLimit, offset);

    if (data.projects !== undefined) {
      commit("SET_TOTAL_PROJECTS", data.total);
      commit("SET_PROJECTS", data.projects);
    }
  },
  async fetchProject({ commit, getters }, id) {
    let project = getters.getProjectById(id);

    if (project) {
      commit("SET_PROJECT", project);
    } else {
      let data = await ProjectService.read(id);

      if (data.project) {
        commit("SET_PROJECT", data.project);
        project = data.project;
      }
    }
    return project;
  },
  async editProject({ commit }, project) {
    project = await ProjectService.update(project._id, project);

    if (project) {
      commit("SET_PROJECT", project);
    }
  },
  async deleteProject({ commit }, id) {
    let data = await ProjectService.delete(id);

    if (data) {
      commit("DELETE_PROJECT");
    }
  },
  async clearProject({ commit }) {
    commit("SET_PROJECT", {});
  }
};

export const getters = {
  getProjectById: state => id => {
    return state.projects.find(project => project._id === id);
  }
};
