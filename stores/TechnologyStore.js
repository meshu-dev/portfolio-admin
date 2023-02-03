import { toRaw } from 'vue';
import { defineStore } from 'pinia';

export const useTechnologyStore = defineStore({
  id: 'technologies',
  state: () => ({
    technologies: [],
    allTechnologies: [],
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
    getAllTechnologies(state) {
      return state.allTechnologies;
    },
    getOrderedTechnologies(state) {
      return state.allTechnologies.sort((tech1, tech2) => {
        if (tech1.name < tech2.name) {
          return -1;
        }
        if (tech1.name > tech2.name) {
          return 1;
        }
        return 0;
      });
    },
    getTechnologyNames(state) {
      return state.getOrderedTechnologies.map(technology => technology.name);
    },
    getTechnologyById(state) {
      return (id) => {
        if (!id) {
          return null;
        }
        const rows = state.allTechnologies.filter((technology) => {
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
    async fetchTechnologies() {
      const apiFtn = async () => {
        const runtimeConfig = useRuntimeConfig();
        const maxItemLimit = runtimeConfig.maxItemLimit;
        const itemsPerPage = runtimeConfig.itemsPerPage;

        const result = await technologyService.getAll({'limit': maxItemLimit});

        if (result['data'] && result['meta']) {
          this.setPaginatedTechnologies(
            result['data'],
            result['meta'],
            itemsPerPage
          );

          this.allTechnologies = result['data'];
        }
      };

      const result = await callApi(apiFtn);
      this.fetched = true;

      return result;
    },
    async changePage(newPage) {
      const newIndex = newPage - 1;

      if (this.technologies[newIndex] == null) {
        await this.fetchTechnologies();
      }
      this.currentPage = newPage;
    },
    async addTechnology(params) {
      let result = null;

      const apiFtn = async () => {
        result = await technologyService.add(params);
        this.clearData();
      };

      await callApi(apiFtn);
      return result;
    },
    async editTechnology(id, params) {
      let result = null;

      const apiFtn = async () => {
        result = await technologyService.edit(id, params);
        this.clearData();
      };

      await callApi(apiFtn);
      return result;
    },
    async deleteTechnology(id, params) {
      let result = null;

      const apiFtn = async () => {
        result = await technologyService.delete(id);
        this.clearData();
      };

      await callApi(apiFtn);
      return result;
    },
    setPaginatedTechnologies(data, meta, pageLimit) {
      this.technologies = this.getPagedTechnologies(data, pageLimit);
      
      this.pageLimit = pageLimit;
      this.total = meta['total'];

      this.lastPage = Math.ceil(this.total / this.pageLimit);
    },
    getPagedTechnologies(technologies, pageLimit) {
      let pageTechnologies = [];
      let count = 0;
      let pageIndex = 0;

      for (const technology of technologies) {
        if (pageTechnologies[pageIndex] == null) {
          pageTechnologies[pageIndex] = [];
        }

        pageTechnologies[pageIndex].push(technology);
        count++;

        if (count == pageLimit) {
          pageIndex++;
          count = 0;
        }
      }
      return pageTechnologies;
    },
    setBlankTechnology() {
      this.technology = { name: '' };
    },
    setSelectedTechnology(id) {
      for (const technology of this.getTechnologies) {
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
    clearData() {
      this.technologies = [];
      this.allTechnologies = [];
      this.technology = null;
      this.currentPage = 1;
      this.lastPage = null;
      this.pageLimit = null;
      this.total = null;
      this.fetched = false;
    }
  }
});
