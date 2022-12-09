import { toRaw } from 'vue';
import { defineStore } from 'pinia';

export const useImageStore = defineStore({
  id: 'image',
  state: () => ({
    formVisible: false,
    searchResults: [],
    searchedResults: [],
    viewerImageUrl: null,
    imageUrl: null,
    image: null
  }),
  getters: {
    isFormVisible(state) {
      return state.formVisible;
    },
    getSearchResults(state) {
      return state.searchResults;
    },
    getSearchedResults(state) {
      return (term) => {
        if (state.searchedResults[term]) {
          return state.searchedResults[term];
        }
        return null;
      };
    },
    getSearchResultEntry(state) {
      return (imdbId) => {
        const rows = state.searchResults.filter((searchResult) => {
          return searchResult.imdbID == imdbId
        });

        const item = rows[0] ? toRaw(rows[0]) : null;
        return item;
      };
    },
    getViewerImageUrl(state) {
      return state.viewerImageUrl;
    },
    getImageUrl(state) {
      return state.imageUrl;
    },
    getImage(state) {
      return state.image;
    }
  },
  actions: {
    setFormVisiblity(isVisible) {
      this.formVisible = isVisible;
    },
    async search(term) {
      const apiFtn = async () => {
        let result = await omdbService.search(term);
        result = result['data'] ?? [];

        this.searchResults = result;
        this.searchedResults[term] = result;
      };

      const result = await callApi(apiFtn);
      return result;
    },
    async fetchById(id) {
      const apiFtn = async () => {
        const result = await omdbService.getById(id);
        result = result['data'] ?? [];

        this.entry = result;
        this.entries[result['imdbID']] = result;
      };

      const result = await callApi(apiFtn);
      return result;
    },
    async addImage(params) {
      let result = null;

      const apiFtn = async () => {
        let formData = new FormData();
        formData.append('image', params['image']);
        formData.append('thumb', true);

        console.log('FormData', formData);

        result = await imageService.add(formData);
        const image = result['data'] ?? null;

        this.image = image;
        this.imageUrl = image.url;
      };

      await callApi(apiFtn);
      return result;
    },
    clearSearchResults() {
      this.searchResults = [];
    },
    setViewerImageUrl(viewerImageUrl) {
      this.viewerImageUrl = viewerImageUrl;
    },
    setImageUrl(imageUrl) {
      this.imageUrl = imageUrl;
    },
    setImage(image) {
      this.image = image;
    }
  }
});
