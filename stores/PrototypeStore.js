import { toRaw } from 'vue';
import { defineStore } from 'pinia';

export const usePrototypeStore = defineStore({
  id: 'prototypes',
  state: () => ({
    prototypes: [],
    prototype: null,
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
    getPrototypes(state) {
      if (state.prototypes[state.getPageIndex]) {
        return state.prototypes[state.getPageIndex];
      }
      return [];
    },
    getPrototypeById(state) {
      return (id) => {
        if (!id) {
          return null;
        }
        const rows = this.getPrototypes.filter((prototype) => {
          return prototype.id == id
        });
        const prototype = rows[0] ? toRaw(rows[0]) : null;
        return prototype;
      };
    },
    getPrototypesByTypeId(state) {
      return (typeId) => {
        if (!typeId) {
          return this.prototypes;
        }

        return this.getPrototypes.filter((prototype) => {
          return prototype.type.id == typeId
        });
      };
    },
    getPrototypeByType(state) {
      return (type) => {
        if (!type || type === 'All') {
          return this.getPrototypes(state);
        }

        return this.getPrototypes.filter((prototype) => {
          return prototype.type.name == type;
        });
      };
    },
    getPrototype(state) {
      return state.prototype;
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
    async fetchPrototypes(page = 1) {
      const apiFtn = async (page) => {
        const result = await prototypeService.getAll(page);

        if (result['data'] && result['meta']) {
          const index = result['meta']['current_page'] - 1;

          this.prototypes[index] = result['data'] ?? [];
  
          this.lastPage = result['meta']['last_page'];
          this.pageLimit = result['meta']['per_page'];
          this.total = result['meta']['total'];
        }
      };

      const result = await callApi(() => apiFtn(page));
      this.fetched = true;

      return result;
    },
    async addPrototype(params) {
      let result = null;

      const apiFtn = async () => {
        result = await prototypeService.add(params);
        const prototype = result['data'] ?? null;
  
        this.prototypes.unshift(prototype);
        this.prototype = null;
      };

      await callApi(apiFtn);
      return result;
    },
    async editPrototype(id, params) {
      let result = null;

      const apiFtn = async () => {
        result = await prototypeService.edit(id, params);
        const prototype = result['data'] ?? null;
  
        this.replaceProjectInList(prototype);
        this.prototype = null;
      };

      await callApi(apiFtn);
      return result;
    },
    async deletePrototype(id, params) {
      let result = null;

      const apiFtn = async () => {
        result = await prototypeService.delete(id);
        console.log('prototype', result);
  
        this.deletePrototypeFromList(id);
        this.prototype = null;
      };

      await callApi(apiFtn);
      return result;
    },
    setBlankPrototype() {
      this.prototype = {
        name: '',
        type: {},
        description: '',
        repositories: [],
        technologies: [],
        images: []
      };
    },
    setPrototype(prototype) {
      this.prototype = prototype;
    },
    setSelectedPrototype(id) {
      for (const prototype of this.prototypes) {
        if (prototype.id == id) {
          this.prototype = prototype;
          return true;
        }
      }
      return false;
    },
    replacePrototypeInList(prototype) {
      for (let prototypeKey in this.prototypes) {
        const currentPrototype = this.prototypes[itemKey];

        if (currentPrototype.id == current.id) {
          this.prototypes[prototypeKey] = prototype;
          return true;
        }
      }
      return false;
    },
    deletePrototypeFromList(id) {
      const filteredPrototypes = this.prototypes.filter((prototype) => {
        return prototype.id != id
      });

      this.prototypes = filteredPrototypes;
    },
    async changePage(newPage) {
      const newIndex = newPage - 1;

      if (this.prototypes[newIndex] == null) {
        await this.fetchPrototypes(newPage);
      }
      this.currentPage = newPage;
    }
  }
});
