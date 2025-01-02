<template>
  <Primitive v-bind="props" :class="cn(orientations[orientation])">
    <slot />
  </Primitive>
</template>

<script lang="ts" setup>
import type { ClassValue } from 'clsx'
import type { PrimitiveProps } from '../../../module'
import { cn } from '../../utils/helpers'
import Primitive from '../Primitive/index.vue'

type Orientation = 'horizontal' | 'vertical'

const orientations: Record<Orientation, ClassValue> = {
  horizontal: 'w-full h-px bg-primary-50',
  vertical: 'w-px h-full bg-primary-50',
}

const { orientation = 'horizontal', ...props } = defineProps<
  { orientation?: Orientation } & PrimitiveProps
>()
</script>
