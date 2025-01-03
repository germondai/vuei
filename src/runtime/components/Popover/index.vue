<script lang="ts">
import { onClickOutside } from '@vueuse/core'
import {
  type Ref,
  type WritableComputedRef,
  computed,
  onUnmounted,
  ref,
  useId,
} from 'vue'
import { useFallbackModel } from '../../composables/useFallbackModel'
import { createContext } from '../../utils/createContext'
import { injectDialogContext } from '../Dialog/index.vue'

export type PopoverStates = (
  | { id: string; opened: boolean }
  | null
  | undefined
)[]

export type PopoverContext = {
  trigger: Ref<HTMLElement | null>
  content: Ref<HTMLElement | null>
  opened: WritableComputedRef<boolean | Ref<boolean, boolean>, boolean>
  states: Ref<PopoverStates>
}

export const [injectPopoverContext, providePopoverContext] =
  createContext<PopoverContext>('Popover')
</script>

<script lang="ts" setup>
const { states } = injectDialogContext({
  states: ref([]),
})

const id = useId()

const content = ref<HTMLElement | null>(null)
const trigger = ref<HTMLElement | null>(null)

const { required, ...props } = defineProps<{
  opened?: boolean
  required?: boolean
}>()

const emit = defineEmits<{ (e: 'update:opened', value: boolean): void }>()

const opened = useFallbackModel(props, 'opened', emit)

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

const open = () => (opened.value = true)
const close = () => (opened.value = false)
const toggle = () => (opened.value = !opened.value)

onClickOutside(
  content,
  () => {
    if (required || childOpened.value) return
    opened.value = false
  },
  { ignore: [trigger] },
)

defineExpose({ open, close, toggle })

providePopoverContext({
  trigger,
  content,
  opened,
  states,
})
</script>

<template>
  <slot />
</template>
