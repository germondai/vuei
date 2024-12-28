<template>
  <Primitive
    :as
    :asChild
    :class="cn(baseClass.root, { 'bg-primary-900': value })"
    @click="value = !value"
  >
    <span :class="cn(baseClass.thumb, { 'translate-x-6': value })" />
  </Primitive>
</template>

<script lang="ts" setup>
import { useVModel } from '@vueuse/core'
import type { ClassValue } from 'clsx'
import type { MaybeRef } from 'vue'
import type { PrimitiveProps } from '../../../module'
import { cn } from '../../utils/helpers'
import Primitive from '../Primitive/index.vue'

const {
  thumbClass,
  as = 'button',
  asChild,
  ...props
} = defineProps<
  { thumbClass?: ClassValue; modelValue?: MaybeRef<boolean> } & PrimitiveProps
>()

const emit = defineEmits<{ (e: 'update:modelValue', value: boolean): void }>()

const value = useVModel(props, 'modelValue', emit)

const baseClass: Record<'root' | 'thumb', ClassValue> = {
  root: 'relative flex items-center w-12 h-6 p-0.5 rounded-full shdw transition-colors',
  thumb:
    'size-5 rounded-full bg-primary-50 transition-transform pointer-events-none',
}
</script>
