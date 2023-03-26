// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss'],
  srcDir: './src',
  tailwindcss: {
    configPath: './tailwind.config.ts',
  },
})
