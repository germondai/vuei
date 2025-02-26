<template>
  <Primitive
    :as
    :asChild
    :class="cn(baseClass.root, { 'bg-primary-800': checked })"
    @click="!disabled && (checked = !checked)"
  >
    <span
      :class="cn(baseClass.thumb, thumbClass, { 'translate-x-6': checked })"
    />
  </Primitive>
</template>

<script lang="ts" setup>
import type { ClassValue } from 'clsx'
import { useFallbackModel } from '../../composables/useFallbackModel'
import type { PrimitiveProps, TriggerProps } from '../../types'
import { cn } from '../../utils/cn'
import Primitive from '../Primitive/index.vue'

const baseClass: Record<'root' | 'thumb', ClassValue> = {
  root: 'relative flex items-center w-12 h-6 p-0.5 rounded-full shdw transition-colors',
  thumb:
    'size-5 rounded-full bg-primary-50 transition-transform pointer-events-none',
}

const {
  disabled,
  thumbClass,
  as = 'button',
  asChild,
  ...props
} = defineProps<
  { checked?: boolean; thumbClass?: ClassValue } & TriggerProps & PrimitiveProps
>()

const emit = defineEmits<{ (e: 'update:checked', value: boolean): void }>()

const checked = useFallbackModel(props, 'checked', emit)
</script>
