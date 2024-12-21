<template>
  <div
    ref="cont"
    class="w-full h-0 overflow-hidden transition-all"
    :class="{ 'h-auto': isOpen }"
  >
    <component :is="tag" v-bind="$attrs">
      <slot />
    </component>
  </div>
</template>

<script lang="ts" setup>
import { onClickOutside } from '@vueuse/core'
import { type Ref, inject, ref, useTemplateRef } from 'vue'

defineOptions({ inheritAttrs: false })

const { tag = 'div', required = false } = defineProps<{
  tag?: HTMLElement['tagName']
  required?: boolean
}>()

const isOpen = inject<Ref<boolean>>('accordionState') || ref(false)
const trigger = inject<Ref<HTMLElement>>('accordionTrigger')

const cont = useTemplateRef<HTMLElement>('cont')

onClickOutside(
  cont,
  () => {
    if (required) return
    isOpen.value = false
  },
  { ignore: [trigger] },
)

const openAccordion = () => (isOpen.value = true)
const closeAccordion = () => (isOpen.value = false)

defineExpose({ openAccordion, closeAccordion })
</script>
