<template>
  <component :is="tag" class="relative">
    <slot />
  </component>
</template>

<script lang="ts" setup>
import { onClickOutside } from '@vueuse/core'
import { type MaybeRef, computed, provide, ref } from 'vue'

const content = ref<HTMLElement>()
const trigger = ref<HTMLElement>()

const {
  tag = 'div',
  isOpen: isO,
  required,
} = defineProps<{
  tag?: HTMLElement['tagName']
  isOpen?: MaybeRef<boolean>
  required?: boolean
}>()
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
provide('popoverToggle', toggle)
</script>
