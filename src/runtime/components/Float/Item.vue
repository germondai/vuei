<template>
  <component :is="tag" ref="float" class="FloatItem" :style="parallaxStyle">
    <slot />
  </component>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import { useSharedMouseInElement } from '../../composables/useSharedMouseInElement'

const { tag = 'div', velocity = 1 } = defineProps<{
  tag?: HTMLElement['tagName']
  velocity?: number
}>()

const float = ref()
const {
  elementX: elX,
  elementY: elY,
  elementWidth: elW,
  elementHeight: elH,
} = useSharedMouseInElement({ target: float })

const parallaxStyle = computed(() => {
  const x = Math.round((elX.value - elW.value / 2) * velocity) / 100
  const y = Math.round(((elY.value - elH.value / 10) * velocity) / 200)

  return `transform: translate(${x}px, ${y}px);`
})
</script>

<style scoped>
.FloatItem {
  transform-style: preserve-3d;
  transition: 75ms linear all;
  @apply absolute pointer-events-none will-change-transform origin-center;
}
</style>
