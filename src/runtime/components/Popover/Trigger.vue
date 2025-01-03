<template>
  <Primitive
    ref="trigger"
    v-bind="props"
    :class="cn(baseClass)"
    @click="opened = !opened"
  >
    <slot />
  </Primitive>
</template>

<script lang="ts" setup>
import { injectPopoverContext } from './index.vue'
import type { PrimitiveProps } from '../../types'
import { cn } from '../../utils/cn'
import Primitive from '../Primitive/index.vue'

const baseClass = 'cursor-pointer'

const { trigger, opened } = injectPopoverContext()

const { ...props } = defineProps<{} & PrimitiveProps>()
</script>
