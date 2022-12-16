import { defineStore } from 'pinia';
import { useRepositoryStore } from '@/stores/RepositoryStore';

export const useRepositorySelectStore = defineStore({
  id: 'repository-select',
  state: () => ({ }),
  getters: {
    getOptions() {
      const repositoryStore = useRepositoryStore();

      const options = repositoryStore.getRepositories.map((repository) => {
        return repository.name;
      });

      return options;
    }
  },
  actions: { }
});
