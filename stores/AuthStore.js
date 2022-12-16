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
    setupAuth() {
      if (this.isAppLoaded === false) {
        const isLoggedIn = localStorage.getItem('isLoggedIn');

        this.loggedIn = isLoggedIn;
        this.isAppLoaded = true;
      }
    },
    async login(username, password) {
      const isLoggedIn = await authService.login(username, password);
      this.loggedIn = isLoggedIn;

      if (isLoggedIn === true) {
        localStorage.setItem('isLoggedIn', true);
        this.loggedIn = true;
        
        await navigateTo('/');
      }
    },
    async logout() {
      authService.logout();

      localStorage.removeItem('isLoggedIn', true);
      this.loggedIn = false;

      await navigateTo('/login');
    }
  }
});
