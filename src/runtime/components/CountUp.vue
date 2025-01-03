<template>
  <Primitive ref="target" v-bind="props">{{ count }}</Primitive>
</template>

<script setup lang="ts">
import { useIntersectionObserver } from '@vueuse/core'
import { ref } from 'vue'
import Primitive from './Primitive/index.vue'
import type { PrimitiveProps } from '../types'

const {
  number = 0,
  duration = 1000,
  ...props
} = defineProps<{ number?: number; duration?: number } & PrimitiveProps>()

const count = ref<number>(0)

const animateCount = () => {
  const startTime = performance.now()

  const animate = (currentTime: number) => {
    const progress = Math.min(1, (currentTime - startTime) / duration)
    count.value = Math.floor(number * progress)

    if (progress < 1) requestAnimationFrame(animate)
  }

  requestAnimationFrame(animate)
}

const target = ref<HTMLElement>()

const { stop } = useIntersectionObserver(target, (entries) => {
  const entry = entries[0]
  if (!entry?.isIntersecting) return
  animateCount()
  stop()
})
</script>
