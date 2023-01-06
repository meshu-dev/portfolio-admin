export default defineNuxtConfig({
  css: [
    'vuetify/lib/styles/main.sass'
  ],
  build: {
    transpile: ['vuetify']
  },
  modules: [
    '@pinia/nuxt'
  ],
  runtimeConfig: {
    public: {
      apiUrl: process.env.NUXT_PUBLIC_API_URL,
      itemsPerPage: process.env.NUXT_PUBLIC_ITEMS_PER_PAGE,
      maxItemLimit: process.env.NUXT_PUBLIC_MAX_ITEM_LIMIT
    }
  }
});
