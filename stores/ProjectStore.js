import { toRaw } from 'vue';
import { defineStore } from 'pinia';

export const useProjectStore = defineStore({
  id: 'projects',
  state: () => ({
    projects: [],
    project: null,
    currentPage: 1,
    lastPage: null,
    pageLimit: null,
    total: null,
    fetched: false
  }),
  getters: {
    getPageIndex(state) {
      return state.currentPage - 1;
    },
    getProjects(state) {
      if (state.projects[state.getPageIndex]) {
        return state.projects[state.getPageIndex];
      }
      return [];
    },
    getProjectsByTypeId(state) {
      return (typeId) => {
        if (!typeId) {
          return this.getProjects;
        }

        return this.getProjects.filter((project) => {
          return project.type.id == typeId
        });
      };
    },
    getProjectById(state) {
      return (id) => {
        if (!id) {
          return null;
        }
        const rows = this.getProjects.filter((project) => {
          return project.id == id
        });
        const project = rows[0] ? toRaw(rows[0]) : null;
        return project;
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
    },
    getCurrentPage(state) {
      return state.currentPage;
    },
    getLastPage(state) {
      return state.lastPage;
    }
  },
  actions: {
    async fetchProjects(page = 1) {
      const apiFtn = async (page) => {
        const result = await projectService.getPaginated(page);

        if (result['data'] && result['meta']) {
          this.setPaginatedProjects(
            result['data'],
            result['meta']
          );
        }
      };

      const result = await callApi(() => apiFtn(page));
      this.fetched = true;
      
      return result;
    },
    async changePage(newPage) {
      const newIndex = newPage - 1;

      if (this.projects[newIndex] == null) {
        await this.fetchProjects(newPage);
      }
      this.currentPage = newPage;
    },
    async addProject(params) {
      let result = null;

      const apiFtn = async () => {
        result = await projectService.add(params);
        this.clearData();
      };

      await callApi(apiFtn);
      return result;
    },
    async editProject(id, params) {
      let result = null;

      const apiFtn = async () => {
        result = await projectService.edit(id, params);
        this.clearData();
      };

      await callApi(apiFtn);
      return result;
    },
    async deleteProject(id, params) {
      let result = null;

      const apiFtn = async () => {
        result = await projectService.delete(id);
        this.clearData();
      };

      await callApi(apiFtn);
      return result;
    },
    setPaginatedProjects(data, meta) {
      const index = meta['current_page'] - 1;

      this.projects[index] = data ?? [];

      this.lastPage = meta['last_page'];
      this.pageLimit = meta['per_page'];
      this.total = meta['total'];
    },
    setBlankProject() {
      this.project = {
        name: '',
        type: {},
        description: '',
        repositories: [],
        technologies: [],
        images: []
      };
    },
    setProject(project) {
      this.project = project;
    },
    setSelectedProject(id) {
      for (const project of this.getProjects) {
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
    },
    clearData() {
      this.projects = [];
      this.project = null;
      this.currentPage = 1;
      this.lastPage = null;
      this.pageLimit = null;
      this.total = null;
      this.fetched = false;
    }
  }
});
