import { defineStore } from 'pinia';

export const useAuthStore = defineStore({
  id: 'auth',
  state: () => ({
    isAppLoaded: false,
    loggedIn: false
  }),
  getters: {
    isLoggedIn(state) {
      return state.loggedIn;
    }
  },
  actions: {
    verifyAuth() {
      if (this.isAppLoaded === false) {
        const token = localStorage.getItem('token');

        this.loggedIn = token ? true : false;
        this.isAppLoaded = true;
      }
    },
    async login(username, password) {
      const isLoggedIn = await authService.login(username, password);
      this.loggedIn = isLoggedIn;

      if (isLoggedIn === true) {
        await navigateTo('/');
      }
    },
    async logout() {
      authService.logout();
      this.loggedIn = false;

      await navigateTo('/login');
    }
  }
});
