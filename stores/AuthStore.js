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
    fetchAuthStatus() {
      if (this.isAppLoaded === false) {
        const isLoggedIn = localStorage.getItem('isLoggedIn');

        const runtimeConfig = useRuntimeConfig();
        console.log('runtimeConfig - ApiUrl', runtimeConfig.apiUrl, process.env, process.env.NUXT_PUBLIC_API_URL);

        apiService.baseUrl = runtimeConfig.apiUrl;

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
      localStorage.removeItem('isLoggedIn', true);
      this.loggedIn = false;

      await navigateTo('/login');
    }
  }
});
