<template>
  <Primitive v-bind="props">
    <slot />
  </Primitive>
</template>

<script lang="ts" setup>
import { onClickOutside } from '@vueuse/core'
import { type MaybeRef, computed, isRef, provide, ref } from 'vue'
import type { PrimitiveProps } from '../../../module'
import Primitive from '../Primitive/index.vue'

const trigger = ref<HTMLElement>()
const content = ref<HTMLElement>()

const {
  isOpen: isO,
  required,
  ...props
} = defineProps<
  {
    isOpen?: MaybeRef<boolean>
    required?: boolean
  } & PrimitiveProps
>()
const emit = defineEmits<{ (e: 'update:isOpen', value: boolean): void }>()

const fallbackIsOpen = ref<boolean>(false)
const isOpen = computed({
  get: () => isO || fallbackIsOpen.value,
  set: (value: boolean) =>
    isO !== undefined && isRef(isO)
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

provide('accordionTrigger', trigger)
provide('accordionContent', content)
provide('accordionState', isOpen)
</script>
