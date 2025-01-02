<script lang="ts">
import { onClickOutside } from '@vueuse/core'
import {
  type MaybeRef,
  type Ref,
  type WritableComputedRef,
  computed,
  isRef,
  ref,
} from 'vue'
import { createContext } from '../../utils/createContext'

export type PopoverContext = {
  trigger: Ref<HTMLElement | null>
  content: Ref<HTMLElement | null>
  isOpen: WritableComputedRef<boolean | Ref<boolean, boolean>, boolean>
}

export const [injectPopoverContext, providePopoverContext] =
  createContext<PopoverContext>('Popover')
</script>

<script lang="ts" setup>
const content = ref<HTMLElement | null>(null)
const trigger = ref<HTMLElement | null>(null)

const { isOpen: isO, required } = defineProps<{
  isOpen?: MaybeRef<boolean>
  required?: boolean
}>()

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

providePopoverContext({
  trigger,
  content,
  isOpen,
})
</script>

<template>
  <slot />
</template>
