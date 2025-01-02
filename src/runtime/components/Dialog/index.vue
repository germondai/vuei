<script lang="ts">
import { onClickOutside, unrefElement } from '@vueuse/core'
import type { ComputedRef, MaybeRef, Ref, WritableComputedRef } from 'vue'
import { computed, isRef, onUnmounted, ref, useId, watch } from 'vue'
import { createContext } from '../../utils/createContext'
import { getEffectiveZIndex } from '../../utils/helpers'

export type DialogStates = (
  | { id: string; isOpen: boolean }
  | null
  | undefined
)[]

export type DialogContext = {
  trigger: Ref<HTMLElement | null>
  content: Ref<HTMLElement | null>
  isOpen: WritableComputedRef<boolean | Ref<boolean, boolean>, boolean>
  isClose: Ref<boolean>
  nest: boolean
  states: Ref<DialogStates>
  childIsOpen: ComputedRef<boolean>
}

export const [injectDialogContext, provideDialogContext] =
  createContext<DialogContext>('Dialog')
</script>

<script lang="ts" setup>
const {
  isOpen: parentIsOpen,
  nest: parentNest,
  states,
} = injectDialogContext({
  states: ref([]),
})

const id = useId()

const trigger = ref<HTMLElement | null>(null)
const content = ref<HTMLElement | null>(null)

const {
  isOpen: isO,
  nest,
  required,
} = defineProps<{
  isOpen?: MaybeRef<boolean>
  nest?: boolean
  required?: boolean
}>()
const emit = defineEmits<{ (e: 'update:isOpen', value: boolean): void }>()

const fallbackIsOpen = ref<boolean>(false)
const isOpen = computed({
  get: () => isO || fallbackIsOpen.value,
  set: (value: boolean) => {
    if (isO !== undefined && isRef(isO)) emit('update:isOpen', value)
    else fallbackIsOpen.value = value

    if (isClose.value === false && parentIsOpen)
      parentIsOpen.value =
        !parentNest && value && parentIsOpen.value ? false : true
  },
})

states.value = !states.value.some((state) => state?.id === id)
  ? [...states.value, { id, isOpen: isOpen as unknown as boolean }]
  : states.value

const childIsOpen = computed(() => {
  const currentIndex = states.value.findIndex((state) => state?.id === id)

  const nextState = states.value[currentIndex + 1]

  if (!nextState) return false

  return nextState?.isOpen ?? false
})

onUnmounted(
  () => (states.value = states.value.filter((state) => state?.id !== id)),
)

const isClose = ref<boolean>(false)

const open = () => {
  isClose.value = true
  isOpen.value = true
  isClose.value = false
}
const close = () => (isOpen.value = false)
const toggle = () => (isOpen.value = !isOpen.value)
const closeAll = async () => {
  isClose.value = true
  isOpen.value = false
  isClose.value = false
}

onClickOutside(
  content,
  (event) => {
    if (required || !isOpen.value || childIsOpen.value) return

    const clickedEl = event.target as HTMLElement | null
    const contentEl = unrefElement(content)
    if (!contentEl || !clickedEl) return

    const contentZIndex = getEffectiveZIndex(contentEl)
    const clickedZIndex = getEffectiveZIndex(clickedEl)
    if (clickedZIndex > contentZIndex) return

    isOpen.value = false
  },
  { ignore: [trigger] },
)

watch(
  isOpen,
  () =>
    !isClose.value &&
    !nest &&
    !isOpen.value &&
    parentIsOpen?.value &&
    (parentIsOpen.value = true),
)

defineExpose({ open, close, toggle, closeAll })

provideDialogContext({
  trigger,
  content,
  isOpen,
  isClose,
  nest,
  states,
  childIsOpen,
})
</script>

<template>
  <slot />
</template>
