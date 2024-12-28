<template>
  <Primitive v-bind="props" :class="cn(baseClass)">
    <slot />
  </Primitive>
</template>

<script lang="ts" setup>
import { onClickOutside } from '@vueuse/core'
import { type MaybeRef, computed, provide, ref } from 'vue'
import type { PrimitiveProps } from '../../../module'
import { cn } from '../../utils/helpers'
import Primitive from '../Primitive/index.vue'

const content = ref<HTMLElement>()
const trigger = ref<HTMLElement>()

const baseClass = 'relative'

const {
  isOpen: isO,
  required,
  ...props
} = defineProps<
  { isOpen?: MaybeRef<boolean>; required?: boolean } & PrimitiveProps
>()

const emit = defineEmits<{ (e: 'update:isOpen', value: boolean): void }>()

const fallbackIsOpen = ref<boolean>(false)
const isOpen = computed({
  get: () => isO || fallbackIsOpen.value,
  set: (value: boolean) =>
    isO !== undefined
      ? emit('update:isOpen', value)
      : (fallbackIsOpen.value = value),
})

onClickOutside(
  content,
  () => {
    if (required) return
    isOpen.value = false
  },
  { ignore: [trigger] },
)

const open = () => (isOpen.value = true)
const close = () => (isOpen.value = false)
const toggle = () => (isOpen.value = !isOpen.value)

defineExpose({ open, close, toggle })

provide('popoverTrigger', trigger)
provide('popoverContent', content)
provide('popoverState', isOpen)
</script>
