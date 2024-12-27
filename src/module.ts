import {
  addComponentsDir,
  addImports,
  createResolver,
  defineNuxtModule,
  installModule,
} from '@nuxt/kit'
import { defu } from 'defu'

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

export type Screen =
  | '3xs'
  | '2xs'
  | 'xs'
  | 'sm'
  | 'md'
  | 'lg'
  | 'xl'
  | '2xl'
  | '3xl'

export type ColorShade =
  | 50
  | 100
  | 200
  | 300
  | 400
  | 500
  | 600
  | 700
  | 800
  | 900
  | 950

export type Enumize<T extends string> = { [K in T]: K }

export type NotificationType =
  | 'INFO'
  | 'SUCCESS'
  | 'WARNING'
  | 'ERROR'
  | 'SYSTEM'

export const NotificationType: Enumize<NotificationType> = {
  INFO: 'INFO',
  SUCCESS: 'SUCCESS',
  WARNING: 'WARNING',
  ERROR: 'ERROR',
  SYSTEM: 'SYSTEM',
} as const

export type ButtonSizes = 'sm' | 'md' | 'lg' | 'xl' | 'icon'
export type ButtonVariants =
  | 'primary'
  | 'secondary'
  | 'destructive'
  | 'outline'
  | 'ghost'
  | 'link'
export type ButtonIconPosition = 'left' | 'right'

export interface ButtonProps {
  tag?: Element['tagName']
  variant?: ButtonVariants
  size?: ButtonSizes
  icon?: string
  iconPosition?: ButtonIconPosition
  selected?: boolean
  disabled?: boolean
  type?: HTMLButtonElement['type']
}

export interface OptionItem<T = unknown> {
  id: string
  name: string
  icon?: string
  data?: T
}

interface FlareOpts {
  color?: string
  size?: number
}

export type Flare = FlareOpts | false
