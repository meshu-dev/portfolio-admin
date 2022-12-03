export default defineNuxtRouteMiddleware((to, from) => {
  if (process.client) {
    const isLoggedIn = authService.isLoggedIn();

    if (isLoggedIn == false && to.path != '/login') {
      return navigateTo('/login');
    }

    if (isLoggedIn == true && to.path === '/login') {
      return navigateTo('/');
    }

    return;
  }
});
