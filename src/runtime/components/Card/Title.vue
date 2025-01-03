<template>
  <Primitive :as :asChild :class="cn(baseClass)">
    <slot />
  </Primitive>
</template>

<script lang="ts" setup>
import { cn } from '../../utils/cn'
import type { PrimitiveProps } from '../../types'
import Primitive from '../Primitive/index.vue'

const { as = 'b', asChild } = defineProps<{} & PrimitiveProps>()

const baseClass = 'text-xl font-bold'
</script>
