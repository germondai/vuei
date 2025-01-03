<template>
  <Primitive ref="float" v-bind="props" :class="cn(baseClass)" :style>
    <slot />
  </Primitive>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import { useSharedMouseInElement } from '../../composables/useSharedMouseInElement'
import { cn } from '../../utils/cn'
import type { PrimitiveProps } from '../../types'
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

const style = computed(() => {
  const x = elX.value
  const y = elY.value
  const w = elW.value
  const h = elH.value

  const tX = x && w && Math.round(((x - w / 2) * velocity) / 100)
  const tY = y && h && Math.round(((y - h / 10) * velocity) / 200)

  return tX && tY && `transform: translate(${tX}px, ${tY}px);`
})
</script>

<style scoped>
.FloatItem {
  transform-style: preserve-3d;
  transition: 75ms linear all;
  @apply absolute pointer-events-none will-change-transform origin-center;
}
</style>
