import { toRaw } from 'vue';
import { defineStore } from 'pinia';

export const useRepositoryStore = defineStore({
  id: 'repositories',
  state: () => ({
    repositories: [],
    repository: null,
    currentPage: 1,
    lastPage: null,
    pageLimit: null,
    total: null,
    fetched: false
  }),
  getters: {
    getPageIndex(state) {
      return state.currentPage - 1;
    },
    getRepositories(state) {
      if (state.repositories[state.getPageIndex]) {
        return state.repositories[state.getPageIndex];
      }
      return [];
    },
    getRepositoryNames(state) {
      return this.getRepositories.map(repository => repository.name);
    },
    getRepositoryOptions(state) {
      if (this.getRepositories.length == 0) {
        return [];
      }

      const options = this.getRepositories.map(repository => {
        return {
          title: repository.name,
          value: repository.id
        }
      });
      return options;
    },
    getRepositoryById(state) {
      return (id) => {
        if (!id) {
          return null;
        }
        const rows = this.getRepositories.filter((repository) => {
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
    },
    getCurrentPage(state) {
      return state.currentPage;
    },
    getLastPage(state) {
      return state.lastPage;
    }
  },
  actions: {
    async fetchRepositories(page = 1) {
      const apiFtn = async (page) => {
        const result = await repositoryService.getAll(page);

        if (result['data'] && result['meta']) {
          const index = result['meta']['current_page'] - 1;

          this.repositories[index] = result['data'] ?? [];
  
          this.lastPage = result['meta']['last_page'];
          this.pageLimit = result['meta']['per_page'];
          this.total = result['meta']['total'];
        }
      };

      const result = await callApi(() => apiFtn(page));
      this.fetched = true;

      return result;
    },
    async addRepository(params) {
      let result = null;

      const apiFtn = async () => {
        result = await repositoryService.add(params);
        const repository = result['data'] ?? null;
  
        this.repositories.unshift(repository);
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
    },
    async changePage(newPage) {
      const newIndex = newPage - 1;

      if (this.repositories[newIndex] == null) {
        await this.fetchRepositories(newPage);
      }
      this.currentPage = newPage;
    }
  }
});
