<template>
  <Primitive v-bind="props" :class="cn(baseClass)">
    <slot />
  </Primitive>
</template>

<script lang="ts" setup>
import { cn } from '../../utils/cn'
import type { PrimitiveProps } from '../../types'
import Primitive from '../Primitive/index.vue'

const { ...props } = defineProps<{} & PrimitiveProps>()

const baseClass = 'flex flex-col text-center sm:text-left'
</script>
