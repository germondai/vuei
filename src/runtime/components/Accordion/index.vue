<script lang="ts">
import { onClickOutside } from '@vueuse/core'
import { type Ref, type WritableComputedRef, ref } from 'vue'
import type { PrimitiveProps } from '../../../module'
import { useFallbackModel } from '../../composables/useFallbackModel'
import { createContext } from '../../utils/createContext'
import Primitive from '../Primitive/index.vue'

export type AccordionContext = {
  trigger: Ref<HTMLElement | null>
  content: Ref<HTMLElement | null>
  opened: WritableComputedRef<boolean | Ref<boolean, boolean>, boolean>
}

export const [injectAccordionContext, provideAccordionContext] =
  createContext<AccordionContext>('Accordion')
</script>

<script lang="ts" setup>
const trigger = ref<HTMLElement | null>(null)
const content = ref<HTMLElement | null>(null)

const { required, as, asChild, ...props } = defineProps<
  { opened?: boolean; required?: boolean } & PrimitiveProps
>()
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

provideAccordionContext({
  trigger,
  content,
  opened,
})
</script>

<template>
  <Primitive :as :asChild>
    <slot />
  </Primitive>
</template>
