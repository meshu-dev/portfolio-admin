import { toRaw } from 'vue';
import { defineStore } from 'pinia';

export const useTypeStore = defineStore({
  id: 'types',
  state: () => ({
    types: [],
    type: null,
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
    getTypes(state) {
      if (state.types[state.getPageIndex]) {
        return state.types[state.getPageIndex];
      }
      return [];
    },
    getTypeNames(state) {
      return this.getTypes.map(type => type.name);
    },
    getTypeById(state) {
      return (id) => {
        if (!id) {
          return null;
        }

        const rows = this.getTypes.filter((type) => {
          return type.id == id
        });
        const type = rows[0] ? toRaw(rows[0]) : null;
        return type;
      };
    },
    getType(state) {
      return state.type;
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
    async fetchTypes(page = 1) {
      const apiFtn = async (page) => {
        const result = await typeService.getAll(page);
        
        if (result['data'] && result['meta']) {
          const index = result['meta']['current_page'] - 1;

          this.types[index] = result['data'] ?? [];
  
          this.lastPage = result['meta']['last_page'];
          this.pageLimit = result['meta']['per_page'];
          this.total = result['meta']['total'];
        }
      };

      const result = await callApi(() => apiFtn(page));
      this.fetched = true;

      return result;
    },
    async addType(params) {
      let result = null;

      const apiFtn = async () => {
        result = await typeService.add(params);
        const type = result['data'] ?? null;
  
        this.types.unshift(type);
        this.type = null;
      };

      await callApi(apiFtn);
      return result;
    },
    async editType(id, params) {
      let result = null;

      const apiFtn = async () => {
        result = await typeService.edit(id, params);
        const type = result['data'] ?? null;
  
        this.replaceTypeInList(type);
        this.type = null;
      };

      await callApi(apiFtn);
      return result;
    },
    async deleteType(id) {
      let result = null;

      const apiFtn = async () => {
        result = await typeService.delete(id);
        console.log('type', result);
  
        this.deleteTypeFromList(id);
        this.type = null;
      };

      await callApi(apiFtn);
      return result;
    },
    setBlankType() {
      this.type = { name: '' };
    },
    setSelectedType(id) {
      for (const type of this.types) {
        if (type.id == id) {
          this.type = type;
          return true;
        }
      }
      return false;
    },
    replaceTypeInList(type) {
      for (let typeKey in this.types) {
        const currentType = this.types[typeKey];

        if (currentType.id == type.id) {
          this.types[typeKey] = type;
          return true;
        }
      }
      return false;
    },
    deleteTypeFromList(id) {
      const filteredTypes = this.types.filter((type) => {
        return type.id != id
      });

      this.types = filteredTypes;
    },
    async changePage(newPage) {
      const newIndex = newPage - 1;

      if (this.types[newIndex] == null) {
        await this.fetchTypes(newPage);
      }
      this.currentPage = newPage;
    }
  }
});
