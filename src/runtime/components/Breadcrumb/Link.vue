<template>
  <Primitive
    :as
    :asChild
    :class="
      cn(baseClass, {
        'opacity-60 hover:opacity-80 transition-opacity': !solid,
      })
    "
  >
    <component
      :is="solid ? 'span' : NuxtLink"
      v-bind="solid ? {} : props"
      class="flex-1 truncate"
    >
      <slot />
    </component>
  </Primitive>
</template>

<script lang="ts" setup>
import type { PrimitiveProps } from '../../../module'
import { cn } from '../../utils/helpers'
import Primitive from '../Primitive/index.vue'
import type { NuxtLinkProps } from '#app'
import { NuxtLink } from '#components'

const {
  solid,
  as = 'li',
  asChild,
  noPrefetch,
  ...props
} = defineProps<{ solid?: boolean } & PrimitiveProps & NuxtLinkProps>()

const baseClass = 'flex items-center'
</script>
