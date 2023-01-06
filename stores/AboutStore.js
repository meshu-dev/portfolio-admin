import { defineStore } from 'pinia';

export const useAboutStore = defineStore({
  id: 'about',
  state: () => ({
    about: null,
    fetched: false
  }),
  getters: {
    getAbout(state) {
      return state.about;
    },
    isFetched(state) {
      return state.fetched;
    }
  },
  actions: {
    async fetchAbout() {
      await callApi(async () => {
        const about = await aboutService.getRow();
        this.about = about['data'] ?? [];
      });

      this.fetched = true;
    },
    setAbout(categoryId) {
      for (let category of this.categories) {
        if (category.id == categoryId) {
          this.category = category;
          return;
        }
      }
      this.category = null;
    },
    async editAbout(id, params) {
      let result = null;

      const apiFtn = async () => {
        result = await aboutService.edit(id, params);
      };

      await callApi(apiFtn);

      return result;
    },
  }
});
