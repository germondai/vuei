<template>
  <Primitive
    :as
    :asChild
    :class="
      cn(
        baseClass,
        selected && variants[variant].selected,
        variants[variant].base,
        sizes.button[size],
        disabled && disabledClass,
      )
    "
    v-bind="bind"
  >
    <Icon
      v-if="icon"
      :name="icon"
      :class="
        cn(
          sizes.icon[size],
          iconPosition === 'right' ? 'order-last' : 'order-first',
        )
      "
    />
    <slot />
  </Primitive>
</template>

<script lang="ts" setup>
import { objectOmit } from '@vueuse/core'
import type { ClassValue } from 'clsx'
import { computed } from 'vue'
import type {
  ButtonProps,
  ButtonSizes,
  ButtonVariants,
  PrimitiveProps,
} from '../../types'
import { cn } from '../../utils/cn'
import Primitive from '../Primitive/index.vue'
import type { NuxtLinkProps } from '#app'
import { Icon, NuxtLink } from '#components'

const {
  icon,
  iconPosition = 'left',
  variant = 'primary',
  size = 'md',
  selected = false,
  disabled,
  as: primitiveAs = 'button',
  asChild,
  noPrefetch,
  ...linkProps
} = defineProps<ButtonProps & PrimitiveProps & NuxtLinkProps>()

const as = computed(() =>
  linkProps.href || linkProps.to ? NuxtLink : primitiveAs,
)
const bind = computed(() =>
  as.value === NuxtLink
    ? objectOmit(linkProps, ['type'])
    : { type: linkProps.type },
)

const baseClass =
  'w-fit flex items-center gap-2 border-2 border-transparent text-center truncate transition-all'
const disabledClass = 'cursor-not-allowed'

const sizes: Record<'button' | 'icon', Record<ButtonSizes, string>> = {
  button: {
    icon: 'p-2 rounded-lg text-base',
    xs: 'px-1 py-0.5 rounded-sm text-xs',
    sm: 'px-2 py-1 rounded-md text-sm',
    md: 'px-4 py-2 rounded-lg text-base',
    lg: 'px-6 py-3 rounded-xl text-lg',
    xl: 'px-8 py-4 rounded-2xl text-xl',
    '2xl': 'px-10 py-5 rounded-3xl text-2xl',
  },
  icon: {
    icon: 'min-w-5 size-5',
    xs: 'min-w-3 size-3',
    sm: 'min-w-4 size-4',
    md: 'min-w-5 size-5',
    lg: 'min-w-6 size-6',
    xl: 'min-w-7 size-7',
    '2xl': 'min-w-8 size-8',
  },
}

const variants: Record<
  ButtonVariants,
  { base: ClassValue } & Partial<Record<'selected', ClassValue>>
> = {
  primary: {
    base: 'text-primary-950 bg-primary-100 hover:bg-primary-100/80 shadow-sm',
    selected: 'bg-primary-100/80',
  },
  secondary: {
    base: 'bg-primary-700 hover:bg-primary-700/80 shadow-sm',
    selected: 'bg-primary-700/80',
  },
  destructive: {
    base: 'bg-red-500 hover:bg-red-500/80',
    selected: 'bg-red-500/80',
  },
  outline: {
    base: 'hover:bg-primary-700 border-primary-700',
    selected: 'bg-primary-700',
  },
  ghost: {
    base: 'hover:bg-primary-700',
    selected: 'bg-primary-700',
  },
  link: {
    base: 'hover:underline',
    selected: 'underline',
  },
}
</script>
