<template>
  <Primitive v-bind="props" :class="cn(baseClass)">
    <slot />
  </Primitive>
</template>

<script lang="ts" setup>
/**
 * This component is designed to apply hover effects to child elements (FlareItem)
 * when the parent container (FlareCont) is hovered over.
 *
 * Use this component only if this behavior is required. Otherwise, the component
 * adds no functional value and can be omitted.
 */

import type { PrimitiveProps } from '../../types'
import { cn } from '../../utils/cn'
import Primitive from '../Primitive/index.vue'

const { ...props } = defineProps<{} & PrimitiveProps>()

const baseClass = 'FlareCont'
</script>

<style>
.FlareCont {
  .FlareItem {
    &::after,
    &::before {
      opacity: 0;
    }
  }

  &:hover .FlareItem {
    &::after,
    &::before {
      opacity: 1;
    }
  }
}
</style>
