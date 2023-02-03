import { toRaw } from 'vue';
import { defineStore } from 'pinia';

export const useRepositoryStore = defineStore({
  id: 'repositories',
  state: () => ({
    repositories: [],
    allRepositories: [],
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
    getAllRepositories(state) {
      return state.allRepositories;
    },
    getOrderedRepositories(state) {
      return state.allTechnologies.sort((tech1, tech2) => {
        if (tech1.name < tech2.name) {
          return -1;
        }
        if (tech1.name > tech2.name) {
          return 1;
        }
        return 0;
      });
    },
    getRepositoryNames(state) {
      return state.getOrderedRepositories.map(repository => repository.name);
    },
    getRepositoryOptions(state) {
      if (state.allRepositories.length == 0) {
        return [];
      }

      const options = state.allRepositories.map(repository => {
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
        const rows = state.allRepositories.filter((repository) => {
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
    async fetchRepositories() {
      const apiFtn = async () => {
        const runtimeConfig = useRuntimeConfig();
        const maxItemLimit = runtimeConfig.maxItemLimit;
        const itemsPerPage = runtimeConfig.itemsPerPage;

        const result = await repositoryService.getAll({'limit': maxItemLimit});

        if (result['data'] && result['meta']) {
          this.setPaginatedRepositories(
            result['data'],
            result['meta'],
            itemsPerPage
          );

          this.allRepositories = result['data'];
        }
      };

      const result = await callApi(apiFtn);
      this.fetched = true;

      return result;
    },
    async changePage(newPage) {
      const newIndex = newPage - 1;

      if (this.repositories[newIndex] == null) {
        await this.fetchRepositories();
      }
      this.currentPage = newPage;
    },
    async addRepository(params) {
      let result = null;

      const apiFtn = async () => {
        result = await repositoryService.add(params);
        this.clearData();
      };

      await callApi(apiFtn);
      return result;
    },
    async editRepository(id, params) {
      let result = null;

      const apiFtn = async () => {
        result = await repositoryService.edit(id, params);
        this.clearData();
      };

      await callApi(apiFtn);
      return result;
    },
    async deleteRepository(id, params) {
      let result = null;

      const apiFtn = async () => {
        result = await repositoryService.delete(id);
        this.clearData();
      };

      await callApi(apiFtn);
      return result;
    },
    setPaginatedRepositories(data, meta, pageLimit) {
      this.repositories = this.getPagedRepositories(data, pageLimit);
      
      this.pageLimit = pageLimit;
      this.total = meta['total'];

      this.lastPage = Math.ceil(this.total / this.pageLimit);
    },
    getPagedRepositories(repositories, pageLimit) {
      let pageRepositories = [];
      let count = 0;
      let pageIndex = 0;

      for (const repository of repositories) {
        if (pageRepositories[pageIndex] == null) {
          pageRepositories[pageIndex] = [];
        }

        pageRepositories[pageIndex].push(repository);
        count++;

        if (count == pageLimit) {
          pageIndex++;
          count = 0;
        }
      }
      return pageRepositories;
    },
    setBlankRepository() {
      this.repository = {
        name: '',
        url: ''
      };
    },
    setSelectedRepository(id) {
      for (const repository of this.getRepositories) {
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
    clearData() {
      this.repositories = [];
      this.allRepositories = [];
      this.repository = null;
      this.currentPage = 1;
      this.lastPage = null;
      this.pageLimit = null;
      this.total = null;
      this.fetched = false;
    }
  }
});
