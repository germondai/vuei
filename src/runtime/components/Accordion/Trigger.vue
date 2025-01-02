<template>
  <Primitive
    v-bind="props"
    ref="trigger"
    :class="cn(baseClass)"
    @click="isOpen = !isOpen"
  >
    <slot />
  </Primitive>
</template>

<script lang="ts" setup>
import { injectAccordionContext } from './index.vue'
import type { PrimitiveProps } from '../../../module'
import { cn } from '../../utils/helpers'
import Primitive from '../Primitive/index.vue'

const baseClass = 'cursor-pointer'

const { trigger, isOpen } = injectAccordionContext()

const { ...props } = defineProps<{} & PrimitiveProps>()
</script>
