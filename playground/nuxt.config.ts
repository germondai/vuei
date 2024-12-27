export default defineNuxtConfig({
  compatibilityDate: '2024-12-20',
  devtools: { enabled: true },

  modules: ['../src/module', '@nuxtjs/tailwindcss'],

  vuei: { prefix: 'VI' },

  css: ['~/assets/css/tailwind.css'],
  tailwindcss: {
    viewer: false,
    exposeConfig: true,
    editorSupport: true,
    config: {
      mode: 'jit',
      theme: {
        screens: {
          '3xs': '320px',
          '2xs': '425px',
          xs: '480px',
          sm: '640px',
          md: '768px',
          lg: '1024px',
          xl: '1280px',
          '2xl': '1440px',
          '3xl': '1920px',
        },
        extend: {
          colors: {
            primary: {
              '50': 'rgb(var(--color-primary-50))',
              '100': 'rgb(var(--color-primary-100))',
              '200': 'rgb(var(--color-primary-200))',
              '300': 'rgb(var(--color-primary-300))',
              '400': 'rgb(var(--color-primary-400))',
              '500': 'rgb(var(--color-primary-500))',
              '600': 'rgb(var(--color-primary-600))',
              '700': 'rgb(var(--color-primary-700))',
              '800': 'rgb(var(--color-primary-800))',
              '900': 'rgb(var(--color-primary-900))',
              '950': 'rgb(var(--color-primary-950))',
            },
          },
        },
      },
    },
  },
})
