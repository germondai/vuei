<template>
  <Primitive
    :as
    :asChild
    :class="cn(baseClass, { 'bg-primary-900': value })"
    @click="value = !value"
  >
    <span
      class="size-5 rounded-full bg-primary-50 transition-transform pointer-events-none"
      :class="{ 'translate-x-6': value }"
    />
  </Primitive>
</template>

<script lang="ts" setup>
import { useVModel } from '@vueuse/core'
import type { MaybeRef } from 'vue'
import type { PrimitiveProps } from '../../../module'
import { cn } from '../../utils/helpers'
import Primitive from '../Primitive/index.vue'

const {
  as = 'button',
  asChild,
  ...props
} = defineProps<{ modelValue?: MaybeRef<boolean> } & PrimitiveProps>()

const emit = defineEmits<{ (e: 'update:modelValue', value: boolean): void }>()

const value = useVModel(props, 'modelValue', emit)

const baseClass =
  'relative flex items-center w-12 h-6 p-0.5 rounded-full shdw transition-colors'
</script>
