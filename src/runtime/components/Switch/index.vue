<template>
  <Primitive
    :as
    :asChild
    :class="cn(baseClass.root, { 'bg-primary-800': value })"
    @click="value = !value"
  >
    <span
      :class="cn(baseClass.thumb, thumbClass, { 'translate-x-6': value })"
    />
  </Primitive>
</template>

<script lang="ts" setup>
import type { ClassValue } from 'clsx'
import { computed, isRef, ref } from 'vue'
import type { PrimitiveProps } from '../../../module'
import { cn } from '../../utils/helpers'
import Primitive from '../Primitive/index.vue'

const baseClass: Record<'root' | 'thumb', ClassValue> = {
  root: 'relative flex items-center w-12 h-6 p-0.5 rounded-full shdw transition-colors',
  thumb:
    'size-5 rounded-full bg-primary-50 transition-transform pointer-events-none',
}

const {
  modelValue: mV,
  thumbClass,
  as = 'button',
  asChild,
} = defineProps<
  { modelValue?: boolean; thumbClass?: ClassValue } & PrimitiveProps
>()

const emit = defineEmits<{ (e: 'update:modelValue', value: boolean): void }>()

const fallbackMV = ref<boolean>(false)
const value = computed({
  get: () => mV || fallbackMV.value,
  set: (value: boolean) => {
    emit('update:modelValue', value)
    if (!isRef(mV)) fallbackMV.value = value
  },
})
</script>
