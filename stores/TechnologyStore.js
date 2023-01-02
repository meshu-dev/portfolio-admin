import { toRaw } from 'vue';
import { defineStore } from 'pinia';

export const useTechnologyStore = defineStore({
  id: 'technologies',
  state: () => ({
    technologies: [],
    technology: null,
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
    getTechnologies(state) {
      if (state.technologies[state.getPageIndex]) {
        return state.technologies[state.getPageIndex];
      }
      return [];
    },
    getTechnologyNames(state) {
      return this.getTechnologies.map(technology => technology.name);
    },
    getTechnologyById(state) {
      return (id) => {
        if (!id) {
          return null;
        }
        const rows = this.getTechnologies.filter((technology) => {
          return technology.id == id
        });
        const technology = rows[0] ? toRaw(rows[0]) : null;
        return technology;
      };
    },
    getTechnology(state) {
      return state.technology;
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
    async fetchTechnologies(page = 1) {
      const apiFtn = async (page) => {
        const result = await technologyService.getAll(page);

        if (result['data'] && result['meta']) {
          const index = result['meta']['current_page'] - 1;

          this.technologies[index] = result['data'] ?? [];
  
          this.lastPage = result['meta']['last_page'];
          this.pageLimit = result['meta']['per_page'];
          this.total = result['meta']['total'];
        }
      };

      const result = await callApi(() => apiFtn(page));
      this.fetched = true;

      return result;
    },
    async addTechnology(params) {
      let result = null;

      const apiFtn = async () => {
        result = await technologyService.add(params);
        const technology = result['data'] ?? null;
  
        this.technologies.unshift(technology);
        this.technology = null;
      };

      await callApi(apiFtn);
      return result;
    },
    async editTechnology(id, params) {
      let result = null;

      const apiFtn = async () => {
        result = await technologyService.edit(id, params);
        const technology = result['data'] ?? null;
  
        this.replaceTechnologyInList(technology);
        this.technology = null;
      };

      await callApi(apiFtn);
      return result;
    },
    async deleteTechnology(id, params) {
      let result = null;

      const apiFtn = async () => {
        result = await technologyService.delete(id);
        console.log('type', result);
  
        this.deleteTechnologyFromList(id);
        this.technology = null;
      };

      await callApi(apiFtn);
      return result;
    },
    setBlankTechnology() {
      this.technology = { name: '' };
    },
    setSelectedTechnology(id) {
      for (const technology of this.technologies) {
        if (technology.id == id) {
          this.technology = technology;
          return true;
        }
      }
      return false;
    },
    replaceTechnologyInList(technology) {
      for (let key in this.technology) {
        const currentTechnology = this.technologies[key];

        if (currentTechnology.id == technology.id) {
          this.technologies[key] = type;
          return true;
        }
      }
      return false;
    },
    deleteTechnologyFromList(id) {
      const filteredTechnologies = this.technologies.filter((technology) => {
        return technology.id != id
      });

      this.technologies = filteredTechnologies;
    },
    async changePage(newPage) {
      const newIndex = newPage - 1;

      if (this.technologies[newIndex] == null) {
        await this.fetchTechnologies(newPage);
      }
      this.currentPage = newPage;
    }
  }
});
