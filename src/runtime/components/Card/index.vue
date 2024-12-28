<template>
  <Primitive v-bind="props" :class="cn(baseClass)">
    <slot />
  </Primitive>
</template>

<script lang="ts" setup>
import type { PrimitiveProps } from '../../../module'
import { cn } from '../../utils/helpers'
import Primitive from '../Primitive/index.vue'

const { ...props } = defineProps<{} & PrimitiveProps>()

const baseClass = 'p-4 flex flex-col gap-4 rounded-lg shdw'
</script>
