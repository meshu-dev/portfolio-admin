import { toRaw } from 'vue';
import { defineStore } from 'pinia';

export const useProjectStore = defineStore({
  id: 'projects',
  state: () => ({
    projects: [],
    project: null,
    fetched: false
  }),
  getters: {
    getProjects(state) {
      return state.projects;
    },
    getProjectById(state) {
      return (id) => {
        if (!id) {
          return null;
        }
        const rows = state.projects.filter((project) => {
          return project.id == id
        });
        const project = rows[0] ? toRaw(rows[0]) : null;
        return project;
      };
    },
    getProjectsByTypeId(state) {
      return (typeId) => {
        if (!typeId) {
          return this.projects;
        }

        return state.projects.filter((project) => {
          return project.type.id == typeId
        });
      };
    },
    getProjectByType(state) {
      return (category) => {
        if (!category || category === 'All') {
          return this.getItems(state);
        }

        return state.items.filter((item) => {
          return item.category.name == category
        });
      };
    },
    getProject(state) {
      return state.project;
    },
    areFetched(state) {
      return state.fetched;
    }
  },
  actions: {
    async fetchProjects() {
      const apiFtn = async () => {
        const result = await projectService.getAll();
        this.projects = result['data'] ?? [];
      };

      const result = await callApi(apiFtn);
      this.fetched = true;
      
      return result;
    },
    async addProject(params) {
      let result = null;

      const apiFtn = async () => {
        result = await projectService.add(params);
        const project = result['data'] ?? null;
  
        this.projects.push(project);
        this.project = null;
      };

      await callApi(apiFtn);
      return result;
    },
    async editProject(id, params) {
      let result = null;

      const apiFtn = async () => {
        result = await projectService.edit(id, params);
        const project = result['data'] ?? null;
  
        this.replaceProjectInList(project);
        this.project = null;
      };

      await callApi(apiFtn);
      return result;
    },
    async deleteProject(id, params) {
      let result = null;

      const apiFtn = async () => {
        result = await projectService.delete(id);
        console.log('project', result);
  
        this.deleteProjectFromList(id);
        this.project = null;
      };

      await callApi(apiFtn);
      return result;
    },
    setBlankProject() {
      this.project = { name: '' };
    },
    setSelectedProject(id) {
      for (const project of this.projects) {
        if (project.id == id) {
          this.project = project;
          return true;
        }
      }
      return false;
    },
    replaceProjectInList(project) {
      for (let projectKey in this.projects) {
        const currentProject = this.projects[itemKey];

        if (currentProject.id == current.id) {
          this.projects[projectKey] = project;
          return true;
        }
      }
      return false;
    },
    deleteProjectFromList(id) {
      const filteredProjects = this.projects.filter((project) => {
        return project.id != id
      });

      this.projects = filteredProjects;
    }
  }
});
