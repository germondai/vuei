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

const baseClass = 'p-4 flex flex-col gap-4 rounded-lg shdw'
</script>
