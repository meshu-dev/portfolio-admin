export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook('app:created', async () => {
    console.log('Starting app with API: ', nuxtApp.$config.public.apiUrl);
  });
});
