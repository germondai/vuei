<template>
  <Teleport to="#teleports">
    <TransitionGroup :name="transition">
      <template v-if="isOpen">
        <div :class="cn(baseClass.background, backgroundClass)" />
        <Primitive
          ref="content"
          v-bind="{ ...props, ...$attrs }"
          :class="cn(baseClass.content)"
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
import { type HTMLAttributes, computed } from 'vue'
import { injectPopoverContext } from './index.vue'
import type { PrimitiveProps } from '../../../module'
import { cn } from '../../utils/helpers'
import Primitive from '../Primitive/index.vue'

const baseClass: Record<'background' | 'content', string> = {
  background: 'fixed inset-0 size-full z-[1000] pointer-events-none',
  content: 'fixed overflow-y-auto pointer-events-auto z-[1001]',
}

defineOptions({ inheritAttrs: false })

const { trigger, content, isOpen } = injectPopoverContext()

const {
  transition = 'fade',
  gap = 8,
  backgroundClass,
  ...props
} = defineProps<
  {
    transition?: 'fade'
    gap?: number
    backgroundClass?: HTMLAttributes['class']
  } & PrimitiveProps
>()

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
