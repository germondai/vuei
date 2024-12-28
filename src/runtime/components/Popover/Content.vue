<template>
  <Teleport to="#teleports">
    <TransitionGroup :name="transition">
      <template v-if="isOpen">
        <div :class="cn(baseBgClass, bgClass)" />
        <Primitive
          ref="content"
          v-bind="{ ...props, ...$attrs }"
          :class="cn(baseClass)"
          :style
        >
          <slot />
        </Primitive>
      </template>
    </TransitionGroup>
  </Teleport>
</template>

<script lang="ts" setup>
import { useElementBounding, useWindowSize } from '@vueuse/core'
import { type HTMLAttributes, type Ref, computed, inject } from 'vue'
import type { PrimitiveProps } from '../../../module'
import { cn } from '../../utils/helpers'
import Primitive from '../Primitive/index.vue'

defineOptions({ inheritAttrs: false })

const baseClass = 'fixed overflow-y-auto pointer-events-auto z-[1001]'
const baseBgClass = 'fixed inset-0 size-full z-[1000] pointer-events-none'

const {
  transition = 'fade',
  gap = 8,
  bgClass,
  ...props
} = defineProps<
  {
    transition?: 'fade'
    gap?: number
    bgClass?: HTMLAttributes['class']
  } & PrimitiveProps
>()

const isOpen = inject<Ref<boolean>>('popoverState')
const trigger = inject<Ref<HTMLElement>>('popoverTrigger')
const content = inject<Ref<HTMLElement>>('popoverContent')

const { width: windowWidth, height: windowHeight } = useWindowSize()

const triggerRect = useElementBounding(trigger)
const contentRect = useElementBounding(content)

const style = computed(() => {
  const position: {
    x: 'left' | 'center' | 'right'
    y: 'top' | 'center' | 'bottom'
  } = { x: 'center', y: 'center' }

  let top =
    triggerRect.top.value +
    (triggerRect.height.value - contentRect.height.value) / 2

  if (
    windowHeight.value - triggerRect.bottom.value >=
    contentRect.height.value
  ) {
    top = triggerRect.bottom.value + gap
    position.y = 'bottom'
  } else if (triggerRect.top.value >= contentRect.height.value) {
    top = triggerRect.top.value - contentRect.height.value - gap
    position.y = 'top'
  }

  let left =
    triggerRect.left.value +
    (triggerRect.width.value - contentRect.width.value) / 2

  if (windowWidth.value - triggerRect.right.value >= contentRect.width.value) {
    left = triggerRect.left.value
    position.x = 'left'
  } else if (triggerRect.left.value >= contentRect.width.value) {
    left = triggerRect.right.value - contentRect.width.value
    position.x = 'right'
  }

  if (position.y === 'center')
    if (position.x === 'left') left += triggerRect.width.value + gap
    else if (position.x === 'right') left -= triggerRect.width.value + gap

  return { top: `${top}px`, left: `${left}px` }
})
</script>
