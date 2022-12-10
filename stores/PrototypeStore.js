import { toRaw } from 'vue';
import { defineStore } from 'pinia';

export const usePrototypeStore = defineStore({
  id: 'prototypes',
  state: () => ({
    prototypes: [],
    prototype: null,
    fetched: false
  }),
  getters: {
    getPrototypes(state) {
      return state.prototypes;
    },
    getPrototypeById(state) {
      return (id) => {
        if (!id) {
          return null;
        }
        const rows = state.prototypes.filter((prototype) => {
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

        return state.prototypes.filter((prototype) => {
          return prototype.type.id == typeId
        });
      };
    },
    getPrototypeByType(state) {
      return (type) => {
        if (!type || type === 'All') {
          return this.getPrototypes(state);
        }

        return state.prototypes.filter((prototype) => {
          return prototype.type.name == type;
        });
      };
    },
    getPrototype(state) {
      return state.prototype;
    },
    areFetched(state) {
      return state.fetched;
    }
  },
  actions: {
    async fetchPrototypes() {
      const apiFtn = async () => {
        const result = await prototypeService.getAll();
        this.prototypes = result['data'] ?? [];
      };

      const result = await callApi(apiFtn);
      this.fetched = true;

      return result;
    },
    async addPrototype(params) {
      let result = null;

      const apiFtn = async () => {
        result = await prototypeService.add(params);
        const prototype = result['data'] ?? null;
  
        this.prototypes.push(prototype);
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
      this.prototype = { name: '' };
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
    }
  }
});
