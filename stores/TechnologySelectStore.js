import { defineStore } from 'pinia';
import { useTechnologyStore } from '@/stores/TechnologyStore';

export const useTechnologySelectStore = defineStore({
  id: 'technology-select',
  state: () => ({ }),
  getters: {
    getOptions() {
      const technologyStore = useTechnologyStore();

      const options = technologyStore.getTechnologies.map((technology) => {
        return technology.name;
      });

      return options;
    }
  },
  actions: { }
});
