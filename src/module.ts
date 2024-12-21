import {
  addComponentsDir,
  addImports,
  createResolver,
  defineNuxtModule,
  installModule,
} from '@nuxt/kit'

type Screen = '3xs' | '2xs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl'
type ColorShade = 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | 950

export interface ModuleOptions {
  prefix?: string
  css?: boolean
  theme?: {
    screens?: Record<Screen, string>
    colors?: Record<ColorShade, string>
  }
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: '@vuei/nuxt',
    configKey: 'vuei',
  },
  defaults: {
    prefix: 'VI',
    css: true,
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
      colors: {
        50: 'var(--color-primary-50)',
        100: 'var(--color-primary-100)',
        200: 'var(--color-primary-200)',
        300: 'var(--color-primary-300)',
        400: 'var(--color-primary-400)',
        500: 'var(--color-primary-500)',
        600: 'var(--color-primary-600)',
        700: 'var(--color-primary-700)',
        800: 'var(--color-primary-800)',
        900: 'var(--color-primary-900)',
        950: 'var(--color-primary-950)',
      },
    },
  },
  async setup(options, nuxt) {
    const { resolve } = createResolver(import.meta.url)

    if (options.css)
      nuxt.options.css = [
        resolve('./runtime/assets/style.css'),
        ...nuxt.options.css,
      ]

    await installModule('@nuxtjs/tailwindcss', {
      exposeConfig: true,
      config: {
        darkMode: 'class',
        content: {
          files: [
            resolve('./runtime/components/**/*.{vue,mjs,ts}'),
            resolve('./runtime/*.{mjs,js,ts}'),
          ],
        },
        theme: {
          screens: options.theme?.screens,
          extend: {
            colors: {
              primary: { ...options.theme?.colors },
            },
          },
        },
      },
      viewer: false,
    })
    await installModule('@nuxt/icon')

    addImports({
      name: 'useToast',
      from: resolve('./runtime/composables/useToast'),
    })

    await addComponentsDir({
      prefix: options.prefix,
      path: resolve('./runtime/components'),
    })
  },
})
