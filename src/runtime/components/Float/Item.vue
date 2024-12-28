<template>
  <Primitive
    ref="float"
    v-bind="props"
    :class="cn(baseClass)"
    :style="parallaxStyle"
  >
    <slot />
  </Primitive>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import type { PrimitiveProps } from '../../../module'
import { useSharedMouseInElement } from '../../composables/useSharedMouseInElement'
import { cn } from '../../utils/helpers'
import Primitive from '../Primitive/index.vue'

const { velocity = 1, ...props } = defineProps<
  { velocity?: number } & PrimitiveProps
>()

const baseClass = 'FloatItem'

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
