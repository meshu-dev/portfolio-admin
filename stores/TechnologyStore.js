import { toRaw } from 'vue';
import { defineStore } from 'pinia';

export const useTechnologyStore = defineStore({
  id: 'technologies',
  state: () => ({
    technologies: [],
    technology: null
  }),
  getters: {
    getTechnology(state) {
      return state.technologies;
    },
    getTechnologyById(state) {
      return (id) => {
        if (!id) {
          return null;
        }
        const rows = state.technologies.filter((technology) => {
          return technology.id == id
        });
        const technology = rows[0] ? toRaw(rows[0]) : null;
        return technology;
      };
    },
    getTechnology(state) {
      return state.technology;
    }
  },
  actions: {
    async fetchTechnologies() {
      const apiFtn = async () => {
        const result = await technologyService.getAll();
        this.technologies = result['data'] ?? [];
      };

      const result = await callApi(apiFtn);
      return result;
    },
    async addTechnology(params) {
      let result = null;

      const apiFtn = async () => {
        result = await technologyService.add(params);
        const technology = result['data'] ?? null;
  
        this.technologies.push(technology);
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
      };

      await callApi(apiFtn);
      return result;
    },
    setSelectedTechnology(id) {
      for (const technology of this.technologies) {
        if (technology.id == id) {
          this.technology = technology;
          return;
        }
      }
      this.technology = null;

      return true;
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
    }
  }
});