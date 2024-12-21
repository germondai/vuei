<template>
  <component :is="tag" ref="target" class="FlareItem" :style="computedStyle">
    <slot />
  </component>
</template>

<script lang="ts" setup>
import { templateRef } from '@vueuse/core'
import { computed } from 'vue'
import type { Flare } from '../../../module'
import { useSharedMouseInElement } from '../../composables/useSharedMouseInElement'

const {
  tag = 'div',
  before = { color: '#ffffffaa', size: 600 },
  after = { color: '#ffffff11', size: 400 },
} = defineProps<{
  tag?: HTMLElement['tagName']
  before?: Flare
  after?: Flare
}>()

const target = templateRef<HTMLElement>('target')
const { elementX, elementY } = useSharedMouseInElement({ target })

const computedStyle = computed(() => ({
  '--x': `${Math.round(elementX.value)}px`,
  '--y': `${Math.round(elementY.value)}px`,
  '--fbc': before.color,
  '--fbs': `${before.size}px`,
  '--fac': after.color,
  '--fas': `${after.size}px`,
}))
</script>

<style scoped>
.FlareItem {
  @apply relative;

  &:hover {
    &::before,
    &::after {
      @apply opacity-100 will-change-[background];
    }
  }

  &::before,
  &::after {
    @apply content-[''] absolute top-0 left-0 w-full h-full rounded-[inherit] pointer-events-none duration-500 transition-opacity;
  }

  &::before {
    background: radial-gradient(
      var(--fbs) circle at var(--x) var(--y),
      var(--fbc),
      transparent 40%
    );
    z-index: -1;
  }

  &::after {
    background: radial-gradient(
      var(--fas) circle at var(--x) var(--y),
      var(--fac),
      transparent 40%
    );
    z-index: 1;
  }
}
</style>
