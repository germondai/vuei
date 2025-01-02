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
import type { PrimitiveProps } from '../../../module'
import { createContext } from '../../utils/createContext'
import Primitive from '../Primitive/index.vue'

export type AccordionContext = {
  trigger: Ref<HTMLElement | null>
  content: Ref<HTMLElement | null>
  isOpen: WritableComputedRef<boolean | Ref<boolean, boolean>, boolean>
}

export const [injectAccordionContext, provideAccordionContext] =
  createContext<AccordionContext>('Accordion')
</script>

<script lang="ts" setup>
const trigger = ref<HTMLElement | null>(null)
const content = ref<HTMLElement | null>(null)

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

provideAccordionContext({
  trigger,
  content,
  isOpen,
})
</script>

<template>
  <Primitive v-bind="props">
    <slot />
  </Primitive>
</template>
