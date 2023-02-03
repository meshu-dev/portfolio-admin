import { defineStore } from 'pinia';
import { useRepositoryStore } from '@/stores/RepositoryStore';

export const useRepositorySelectStore = defineStore({
  id: 'repository-select',
  state: () => ({ }),
  getters: {
    getOptions() {
      const repositoryStore = useRepositoryStore();
      return repositoryStore.getRepositoryNames;
    }
  },
  actions: { }
});
