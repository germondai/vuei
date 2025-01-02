<script lang="ts">
import { onClickOutside } from '@vueuse/core'
import { type Ref, type WritableComputedRef, ref } from 'vue'
import { useFallbackModel } from '../../composables/useFallbackModel'
import { createContext } from '../../utils/createContext'

export type PopoverContext = {
  trigger: Ref<HTMLElement | null>
  content: Ref<HTMLElement | null>
  opened: WritableComputedRef<boolean | Ref<boolean, boolean>, boolean>
}

export const [injectPopoverContext, providePopoverContext] =
  createContext<PopoverContext>('Popover')
</script>

<script lang="ts" setup>
const content = ref<HTMLElement | null>(null)
const trigger = ref<HTMLElement | null>(null)

const { required, ...props } = defineProps<{
  opened?: boolean
  required?: boolean
}>()

const emit = defineEmits<{ (e: 'update:opened', value: boolean): void }>()

const opened = useFallbackModel(props, 'opened', emit)

onClickOutside(
  content,
  () => {
    if (required) return
    opened.value = false
  },
  { ignore: [trigger] },
)

const open = () => (opened.value = true)
const close = () => (opened.value = false)
const toggle = () => (opened.value = !opened.value)

defineExpose({ open, close, toggle })

providePopoverContext({
  trigger,
  content,
  opened,
})
</script>

<template>
  <slot />
</template>
