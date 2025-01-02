<template>
  <Primitive
    v-bind="props"
    ref="content"
    :class="cn(baseClass, { 'h-auto': isOpen })"
    :style="!isOpen && { padding: 'unset', margin: 'unset' }"
  >
    <slot />
  </Primitive>
</template>

<script lang="ts" setup>
import { injectAccordionContext } from './index.vue'
import type { PrimitiveProps } from '../../../module'
import { cn } from '../../utils/helpers'
import Primitive from '../Primitive/index.vue'

const baseClass = 'w-full h-0 overflow-hidden transition-all'

const { content, isOpen } = injectAccordionContext()

const { ...props } = defineProps<{} & PrimitiveProps>()
</script>
