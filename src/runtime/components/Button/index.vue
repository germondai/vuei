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
} from '../../../module'
import { cn } from '../../utils/helpers'
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
    sm: 'px-2 py-1 rounded-md text-sm',
    md: 'px-4 py-2 rounded-lg text-base',
    lg: 'px-6 py-3 rounded-xl text-lg',
    xl: 'px-8 py-4 rounded-2xl text-xl',
  },
  icon: {
    icon: 'size-5',
    sm: 'size-4',
    md: 'size-5',
    lg: 'size-6',
    xl: 'size-7',
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
