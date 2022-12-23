import { useAuthStore } from '@/stores/AuthStore';

export default defineNuxtRouteMiddleware((to, from) => {
  if (process.client) {
    const authStore = useAuthStore();
    authStore.verifyAuth();

    if (authStore.isLoggedIn == false && to.path != '/login') {
      return navigateTo('/login');
    }

    if (authStore.isLoggedIn == true && to.path === '/login') {
      return navigateTo('/');
    }

    return;
  }
});
