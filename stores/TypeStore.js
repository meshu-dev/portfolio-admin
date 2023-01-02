import { toRaw } from 'vue';
import { defineStore } from 'pinia';

export const useTypeStore = defineStore({
  id: 'types',
  state: () => ({
    types: [],
    allTypes: [],
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
    getAllTypes(state) {
      return state.allTypes;
    },
    getTypeNames(state) {
      return state.allTypes.map(type => type.name);
    },
    getTypeById(state) {
      return (id) => {
        if (!id) {
          return null;
        }

        const rows = state.allTypes.filter((type) => {
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
    async fetchTypes() {
      const apiFtn = async () => {
        const runtimeConfig = useRuntimeConfig();
        const maxItemLimit = runtimeConfig.maxItemLimit;
        const itemsPerPage = runtimeConfig.itemsPerPage;

        const result = await typeService.getAll({'limit': maxItemLimit});

        if (result['data'] && result['meta']) {
          this.setPaginatedTypes(
            result['data'],
            result['meta'],
            itemsPerPage
          );

          this.allTypes = result['data'];
        }
      };

      const result = await callApi(apiFtn);
      this.fetched = true;

      return result;
    },
    async changePage(newPage) {
      const newIndex = newPage - 1;

      if (this.types[newIndex] == null) {
        await this.fetchTypes();
      }
      this.currentPage = newPage;
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
  
        this.deleteTypeFromList(id);
        this.type = null;
      };

      await callApi(apiFtn);
      return result;
    },
    setPaginatedTypes(data, meta, pageLimit) {
      this.types = this.getPagedTypes(data, pageLimit);
      
      this.pageLimit = pageLimit;
      this.total = meta['total'];

      this.lastPage = Math.ceil(this.total / this.pageLimit);
    },
    getPagedTypes(types, pageLimit) {
      let pageTypes = [];
      let count = 0;
      let pageIndex = 0;

      for (const type of types) {
        if (pageTypes[pageIndex] == null) {
          pageTypes[pageIndex] = [];
        }

        pageTypes[pageIndex].push(type);
        count++;

        if (count == pageLimit) {
          pageIndex++;
          count = 0;
        }
      }
      return pageTypes;
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
    }
  }
});
