import { defineStore } from 'pinia';
import { useRepositoryStore } from '@/stores/RepositoryStore';

export const useRepositorySelectStore = defineStore({
  id: 'repository-select',
  state: () => ({
    selectedValues: null
  }),
  getters: {
    getOptions() {
      const repositoryStore = useRepositoryStore();

      const options = repositoryStore.getRepositories.map((repository) => {
        return repository.name;
      });

      return options;
    },
    getSelectedValues(state) {
      return state.selectedValues;
    },
    getSelectedRepositories(state) {
      return this.getRepositories(state.selectedValues);
    },
    getSelectedRepositoryIds(state) {
      return this.getRepositories(state.selectedValues).map(repository => repository.id);
    }
  },
  actions: {
    getRepositories(selectedValues) {
      if (selectedValues) {
        const repositoryStore = useRepositoryStore();
        const repositories = repositoryStore.getRepositories;
        const selectedRepositories = [];
  
        for (const repository of repositories) {
          if (selectedValues.includes(repository.name) === true) {
            selectedRepositories.push(toRaw(repository));
          }
        }
        console.log('AAA selectedRepositories', selectedRepositories);

        return selectedRepositories;
      }
      return [];
    },
    setSelectedValues(values) {
      this.selectedValues = values;
    }
  }
});
