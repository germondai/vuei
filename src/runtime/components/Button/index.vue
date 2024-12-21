<template>
  <component
    :is="linkProps.href ? NuxtLink : tag"
    v-bind="linkProps"
    class="w-fit flex items-center gap-2 border-2 shadow-lg text-center truncate transition-all"
    :class="{
      'bg-gray-200/20': selected,
      'bg-gray-200/10 hover:bg-gray-200/30': type === 'main',
      'bg-gray-200/5 border-gray-200/20 hover:bg-gray-200/10':
        type === 'shadow',
      'border-transparent': type !== 'shadow',
      'px-2 py-1 rounded-md text-sm': size === 'sm',
      'px-4 py-2 rounded-lg text-base': size === 'md',
      'px-8 py-4 rounded-xl text-lg': size === 'lg',
      'px-12 py-6 rounded-2xl text-xl': size === 'xl',
    }"
  >
    <Icon
      v-if="icon"
      :name="icon"
      class="size-5"
      :class="iconPosition === 'right' ? 'order-last' : 'order-first'"
    />
    <slot />
  </component>
</template>

<script lang="ts" setup>
import type { NuxtLinkProps } from '#app'
import { Icon, NuxtLink } from '#components'
import type { ButtonProps } from '~/src/module'

const {
  tag = 'button',
  icon,
  iconPosition = 'left',
  type = 'main',
  size = 'md',
  selected = false,
  ...linkProps
} = defineProps<NuxtLinkProps & ButtonProps>()
</script>
