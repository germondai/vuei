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

const baseClass = 'flex flex-col-reverse sm:flex-row gap-0.5 sm:gap-2'
</script>
