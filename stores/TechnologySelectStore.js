import { defineStore } from 'pinia';
import { useTechnologyStore } from '@/stores/TechnologyStore';

export const useTechnologySelectStore = defineStore({
  id: 'technology-select',
  state: () => ({ }),
  getters: {
    getOptions() {
      const technologyStore = useTechnologyStore();

      const options = technologyStore.getTechnologyNames;
      return options;
    }
  },
  actions: { }
});
