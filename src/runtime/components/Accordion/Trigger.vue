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
import type { PrimitiveProps } from '../../../module'
import { cn } from '../../utils/helpers'
import Primitive from '../Primitive/index.vue'

const baseClass = 'cursor-pointer'

const { trigger, opened } = injectAccordionContext()

const { ...props } = defineProps<{} & PrimitiveProps>()
</script>
