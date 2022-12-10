import { toRaw } from 'vue';
import { defineStore } from 'pinia';

export const useRepositoryStore = defineStore({
  id: 'repositories',
  state: () => ({
    repositories: [],
    repository: null,
    fetched: false
  }),
  getters: {
    getRepositories(state) {
      return state.repositories;
    },
    getRepositoryNames(state) {
      return state.repositories.map(repository => repository.name);
    },
    getRepositoryById(state) {
      return (id) => {
        if (!id) {
          return null;
        }
        const rows = state.repositories.filter((repository) => {
          return repository.id == id;
        });
        const repository = rows[0] ? toRaw(rows[0]) : null;
        return repository;
      };
    },
    getRepository(state) {
      return state.repository;
    },
    areFetched(state) {
      return state.fetched;
    }
  },
  actions: {
    async fetchRepositories() {
      const apiFtn = async () => {
        const result = await repositoryService.getAll();
        this.repositories = result['data'] ?? [];
      };

      const result = await callApi(apiFtn);
      this.fetched = true;

      return result;
    },
    async addRepository(params) {
      let result = null;

      const apiFtn = async () => {
        result = await repositoryService.add(params);
        const repository = result['data'] ?? null;
  
        this.repositories.push(repository);
        this.repository = null;
      };

      await callApi(apiFtn);
      return result;
    },
    async editRepository(id, params) {
      let result = null;

      const apiFtn = async () => {
        result = await repositoryService.edit(id, params);
        const repository = result['data'] ?? null;
  
        this.replaceRepositoryInList(repository);
        this.repository = null;
      };

      await callApi(apiFtn);
      return result;
    },
    async deleteRepository(id, params) {
      let result = null;

      const apiFtn = async () => {
        result = await repositoryService.delete(id);
        console.log('type', result);
  
        this.deleteRepositoryFromList(id);
        this.repository = null;
      };

      await callApi(apiFtn);
      return result;
    },
    setBlankRepository() {
      this.repository = {
        name: '',
        url: ''
      };
    },
    setSelectedRepository(id) {
      for (const repository of this.repositories) {
        if (repository.id == id) {
          this.repository = repository;
          return true;
        }
      }
      return false;
    },
    replaceRepositoryInList(repository) {
      for (let key in this.repository) {
        const currentRepository = this.repositories[key];

        if (currentRepository.id == repository.id) {
          this.repositories[key] = repository;
          return true;
        }
      }
      return false;
    },
    deleteRepositoryFromList(id) {
      const filteredRepositories = this.repositories.filter((repository) => {
        return repository.id != id
      });

      this.repositories = filteredRepositories;
    }
  }
});
