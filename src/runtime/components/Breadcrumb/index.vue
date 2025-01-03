<template>
  <Primitive :as :asChild :class="cn(baseClass)">
    <slot />
  </Primitive>
</template>

<script lang="ts" setup>
import { cn } from '../../utils/cn'
import type { PrimitiveProps } from '../../types'
import Primitive from '../Primitive/index.vue'

const { as = 'ul', asChild } = defineProps<{} & PrimitiveProps>()

const baseClass = 'flex items-center gap-2 overflow-x-auto'
</script>
