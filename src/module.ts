import {
  addComponentsDir,
  addImports,
  createResolver,
  defineNuxtModule,
  installModule,
} from '@nuxt/kit'
import { defu } from 'defu'
import type { ColorShade, Screen } from './runtime/types'

export * from './runtime/types'

export interface ModuleOptions {
  prefix?: string
  css?: boolean
  theme?: {
    screens?: Partial<Record<Screen, string>>
    colors?: Record<string, Partial<Record<ColorShade, string>>>
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
        primary: {
          50: 'rgb(var(--color-primary-50))',
          100: 'rgb(var(--color-primary-100))',
          200: 'rgb(var(--color-primary-200))',
          300: 'rgb(var(--color-primary-300))',
          400: 'rgb(var(--color-primary-400))',
          500: 'rgb(var(--color-primary-500))',
          600: 'rgb(var(--color-primary-600))',
          700: 'rgb(var(--color-primary-700))',
          800: 'rgb(var(--color-primary-800))',
          900: 'rgb(var(--color-primary-900))',
          950: 'rgb(var(--color-primary-950))',
        },
      },
    },
  },
  async setup(options, nuxt) {
    const { resolve } = createResolver(import.meta.url)

    if (options.css) {
      nuxt.options.css = nuxt.options.css || []
      nuxt.options.css.push(resolve('./runtime/assets/style.css'))
    }

    await installModule('@nuxt/icon')
    await installModule('@nuxt/image')
    await installModule(
      '@nuxtjs/tailwindcss',
      defu(
        {
          exposeConfig: true,
          viewer: false,
          config: {
            darkMode: 'class' as const,
            content: {
              files: [
                resolve('./runtime/components/**/*.{vue,mjs,ts}'),
                resolve('./runtime/*.{mjs,js,ts}'),
              ],
            },
            theme: {
              screens: options.theme?.screens,
              extend: {
                colors: options.theme?.colors,
              },
            },
          },
        },
        nuxt.options.tailwindcss,
      ),
    )

    const imports = {
      composables: [
        'useToast',
        'useContext',
        'useFallbackModel',
        'useValidateField',
        'useSharedMouseInElement',
      ],
      utils: ['cn', 'useSearch', 'useSearchScore'],
    }

    for (const dir in imports)
      for (const name of imports[dir as keyof typeof imports])
        addImports({
          name,
          from: resolve(`./runtime/${dir}/${name}`),
          as: `${options.prefix}${name}`,
        })

    await addComponentsDir({
      prefix: options.prefix,
      path: resolve('./runtime/components'),
      ignore: ['./Primitive/Slot.ts'],
    })
  },
})
