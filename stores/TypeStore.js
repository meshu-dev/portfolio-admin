import { toRaw } from 'vue';
import { defineStore } from 'pinia';

export const useTypeStore = defineStore({
  id: 'types',
  state: () => ({
    types: [],
    type: null,
    fetched: false
  }),
  getters: {
    getTypes(state) {
      return state.types;
    },
    getTypeNames(state) {
      return state.types.map(type => type.name);
    },
    getTypeById(state) {
      return (id) => {
        if (!id) {
          return null;
        }
        console.log('Test', state.types, id);

        const rows = state.types.filter((type) => {
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
    }
  },
  actions: {
    async fetchTypes() {
      const apiFtn = async () => {
        const result = await typeService.getAll();
        this.types = result['data'] ?? [];
      };

      const result = await callApi(apiFtn);
      this.fetched = true;

      return result;
    },
    async addType(params) {
      let result = null;

      const apiFtn = async () => {
        result = await typeService.add(params);
        const type = result['data'] ?? null;
  
        this.types.push(type);
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
    }
  }
});
