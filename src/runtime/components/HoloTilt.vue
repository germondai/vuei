<template>
  <Primitive ref="target" v-bind="props" :class="cn(baseClass)" :style>
    <slot />
  </Primitive>
</template>

<script lang="ts" setup>
import { templateRef } from '@vueuse/core'
import { computed } from 'vue'
import Primitive from './Primitive/index.vue'
import { useSharedMouseInElement } from '../composables/useSharedMouseInElement'
import type { PrimitiveProps } from '../types'
import { cn } from '../utils/cn'

const baseClass = 'HoloTilt'

const { scale = 1, ...props } = defineProps<
  { scale?: number } & PrimitiveProps
>()

const target = templateRef<HTMLElement>('target')

const {
  elementX: elX,
  elementY: elY,
  elementWidth: elW,
  elementHeight: elH,
  isOutside: isO,
} = useSharedMouseInElement({ target })

const style = computed(() => {
  if (isO.value) return

  const x = elX.value
  const y = elY.value
  const w = elW.value
  const h = elH.value

  const rMax = 10
  const rX = y && h && Math.round(rMax / 2 - (y / h) * rMax)
  const rY = x && w && Math.round((x / w) * rMax - rMax / 1.5)

  const perspective = w && Math.round(w)

  return `transform: perspective(${perspective}px) rotateX(${rX}deg) rotateY(${rY}deg) scale(${scale});`
})
</script>

<style scoped>
.HoloTilt {
  transform-style: preserve-3d;
  @apply will-change-transform transform-gpu origin-center transition-all ease-linear;
}
</style>
