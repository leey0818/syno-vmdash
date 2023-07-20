// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
  ],
  css: ['@fortawesome/fontawesome-svg-core/styles.css'],
  plugins: ['./plugins/fontawesome.ts'],
  devtools: {
    enabled: true,
  },
  tailwindcss: {
    exposeConfig: true,
  },
});
