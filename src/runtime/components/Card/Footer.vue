<template>
  <Primitive :as :asChild :class="cn(baseClass)">
    <slot />
  </Primitive>
</template>

<script lang="ts" setup>
import type { PrimitiveProps } from '../../../module'
import { cn } from '../../utils/helpers'
import Primitive from '../Primitive/index.vue'

const { as = 'div', asChild } = defineProps<{} & PrimitiveProps>()

const baseClass = 'flex flex-col-reverse sm:flex-row gap-0.5 sm:gap-2'
</script>
