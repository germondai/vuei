<script lang="ts">
import { onClickOutside, unrefElement } from '@vueuse/core'
import type { ComputedRef, Ref, WritableComputedRef } from 'vue'
import { computed, onUnmounted, ref, useId, watch } from 'vue'
import { useFallbackModel } from '../../composables/useFallbackModel'
import { createContext } from '../../utils/createContext'
import { getEffectiveZIndex } from '../../utils/helpers'

export type DialogStates = (
  | { id: string; opened: boolean }
  | null
  | undefined
)[]

export type DialogContext = {
  trigger: Ref<HTMLElement | null>
  content: Ref<HTMLElement | null>
  opened: WritableComputedRef<boolean | Ref<boolean, boolean>, boolean>
  isClose: Ref<boolean>
  nest: boolean
  states: Ref<DialogStates>
  childOpened: ComputedRef<boolean>
}

export const [injectDialogContext, provideDialogContext] =
  createContext<DialogContext>('Dialog')
</script>

<script lang="ts" setup>
const {
  opened: parentOpened,
  nest: parentNest,
  states,
} = injectDialogContext({
  states: ref([]),
})

const id = useId()

const trigger = ref<HTMLElement | null>(null)
const content = ref<HTMLElement | null>(null)

const { nest, required, ...props } = defineProps<{
  opened?: boolean
  nest?: boolean
  required?: boolean
}>()
const emit = defineEmits<{ (e: 'update:opened', value: boolean): void }>()

const opened = useFallbackModel(props, 'opened', emit, {
  onUpdate: (value) => {
    if (isClose.value === false && parentOpened)
      parentOpened.value =
        !parentNest && value && parentOpened.value ? false : true
  },
})

states.value = !states.value.some((state) => state?.id === id)
  ? [...states.value, { id, opened: opened as unknown as boolean }]
  : states.value

const childOpened = computed(() => {
  const currentIndex = states.value.findIndex((state) => state?.id === id)
  return states.value.slice(currentIndex + 1).some((state) => state?.opened)
})

onUnmounted(() => {
  states.value = states.value.filter((state) => state?.id !== id)
})

const isClose = ref<boolean>(false)

const open = () => {
  isClose.value = true
  opened.value = true
  isClose.value = false
}
const close = () => (opened.value = false)
const toggle = () => (opened.value = !opened.value)
const closeAll = async () => {
  isClose.value = true
  opened.value = false
  isClose.value = false
}

onClickOutside(
  content,
  (event) => {
    if (required || !opened.value || childOpened.value) return

    const clickedEl = event.target as HTMLElement | null
    const contentEl = unrefElement(content)
    if (!contentEl || !clickedEl) return

    const contentZIndex = getEffectiveZIndex(contentEl)
    const clickedZIndex = getEffectiveZIndex(clickedEl)
    if (clickedZIndex > contentZIndex) return

    opened.value = false
  },
  { ignore: [trigger] },
)

watch(
  opened,
  () =>
    !isClose.value &&
    !nest &&
    !opened.value &&
    parentOpened?.value &&
    (parentOpened.value = true),
)

defineExpose({ open, close, toggle, closeAll })

provideDialogContext({
  trigger,
  content,
  opened,
  isClose,
  nest,
  states,
  childOpened,
})
</script>

<template>
  <slot />
</template>
