<template>
  <component :is="tag" ref="target" class="HoloTilt" :style>
    <slot />
  </component>
</template>

<script lang="ts" setup>
import { templateRef } from '@vueuse/core'
import { computed } from 'vue'
import { useSharedMouseInElement } from '../composables/useSharedMouseInElement'

const { tag = 'div', scale = 1 } = defineProps<{
  tag?: HTMLElement['tagName']
  scale?: number
}>()

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

  const rMax = 10
  const rX = Math.round(rMax / 2 - (elY.value / elH.value) * rMax)
  const rY = Math.round((elX.value / elW.value) * rMax - rMax / 1.5)

  return `transform: perspective(${Math.round(elW.value)}px) rotateX(${rX}deg) rotateY(${rY}deg) scale(${scale});`
})
</script>

<style scoped>
.HoloTilt {
  transform-style: preserve-3d;
  @apply will-change-transform transform-gpu origin-center transition-all ease-linear;
}
</style>
