<template>
  <Primitive :as :asChild :class="cn(baseClass)">
    <slot />
  </Primitive>
</template>

<script lang="ts" setup>
import type { PrimitiveProps } from '../../../module'
import { cn } from '../../utils/helpers'
import Primitive from '../Primitive/index.vue'

const { as = 'ul', asChild } = defineProps<{} & PrimitiveProps>()

const baseClass = 'flex items-center gap-2 overflow-x-auto'
</script>
