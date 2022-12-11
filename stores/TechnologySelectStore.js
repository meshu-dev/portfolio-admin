import { defineStore } from 'pinia';
import { useTechnologyStore } from '@/stores/TechnologyStore';

export const useTechnologySelectStore = defineStore({
  id: 'technology-select',
  state: () => ({
    selectedValues: null
  }),
  getters: {
    getOptions() {
      const technologyStore = useTechnologyStore();

      const options = technologyStore.getTechnologies.map((technology) => {
        return technology.name;
      });

      return options;
    },
    getSelectedValues(state) {
      return state.selectedValues;
    },
    getSelectedTechnologies(state) {
      return this.getTechnologies(state.selectedValues);
    },
    getSelectedTechnologyIds(state) {
      return this.getTechnologies(state.selectedValues).map(technology => technology.id);
    }
  },
  actions: {
    getTechnologies(selectedValues) {
      if (selectedValues) {
        const technologyStore = useTechnologyStore();
        const technologies = technologyStore.getTechnologies;
        const selectedTechnologies = [];
  
        for (const technology of technologies) {
          if (selectedValues.includes(technology.name) === true) {
            selectedTechnologies.push(toRaw(technology));
          }
        }
        return selectedTechnologies;
      }
      return [];
    },
    setSelectedValues(values) {
      this.selectedValues = values;
    }
  }
});
