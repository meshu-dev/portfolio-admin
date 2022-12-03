export default defineNuxtConfig({
  css: ['vuetify/lib/styles/main.sass'],
  build: {
    transpile: ['vuetify'],
  },
  vite: {
    define: {
      'process.env.DEBUG': false,
    },
  },
  modules: [
    '@pinia/nuxt'
  ],
  publicRuntimeConfig: {
    apiUrl: process.env.API_URL,
    PAGE_TITLE: 'BING'
  },
  runtimeConfig: {
    public: {
      apiUrl: process.env.API_URL
    }
  }
});
