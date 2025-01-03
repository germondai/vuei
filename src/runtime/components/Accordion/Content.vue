<template>
  <Primitive
    v-bind="props"
    ref="content"
    :class="cn(baseClass, { 'h-auto': opened })"
    :style="!opened && { padding: 'unset', margin: 'unset' }"
  >
    <slot />
  </Primitive>
</template>

<script lang="ts" setup>
import { injectAccordionContext } from './index.vue'
import type { PrimitiveProps } from '../../types'
import { cn } from '../../utils/cn'
import Primitive from '../Primitive/index.vue'

const baseClass = 'w-full h-0 overflow-hidden transition-all'

const { content, opened } = injectAccordionContext()

const { ...props } = defineProps<{} & PrimitiveProps>()
</script>
