<template>
  <Primitive v-bind="props" :class="cn(baseClass)">
    <slot />
  </Primitive>
</template>

<script lang="ts" setup>
import type { PrimitiveProps } from '../../types'
import { cn } from '../../utils/cn'
import Primitive from '../Primitive/index.vue'

const { ...props } = defineProps<{} & PrimitiveProps>()

const baseClass = 'pointer-events-none'
</script>
