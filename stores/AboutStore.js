import { defineStore } from 'pinia';

export const useAboutStore = defineStore({
  id: 'about',
  state: () => ({
    about: null
  }),
  getters: {
    getAbout(state) {
      return state.about;
    }
  },
  actions: {
    async fetchAbout() {
      await callApi(async () => {
        const about = await aboutService.getAll();
        this.about = about['data'] ?? [];
      });
    },
    setAbout(categoryId) {
      for (let category of this.categories) {
        if (category.id == categoryId) {
          this.category = category;
          return;
        }
      }
      this.category = null;
    }
  }
});
