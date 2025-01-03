<template>
  <Primitive
    v-bind="props"
    ref="trigger"
    :class="cn(baseClass)"
    @click="opened = !opened"
  >
    <slot />
  </Primitive>
</template>

<script lang="ts" setup>
import { injectAccordionContext } from './index.vue'
import type { PrimitiveProps } from '../../types'
import { cn } from '../../utils/cn'
import Primitive from '../Primitive/index.vue'

const baseClass = 'cursor-pointer'

const { trigger, opened } = injectAccordionContext()

const { ...props } = defineProps<{} & PrimitiveProps>()
</script>
