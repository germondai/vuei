<template>
  <Primitive
    ref="target"
    v-bind="props"
    :class="cn(baseClass)"
    :style="computedStyle"
  >
    <slot />
  </Primitive>
</template>

<script lang="ts" setup>
import { templateRef } from '@vueuse/core'
import { computed } from 'vue'
import type { Flare, PrimitiveProps } from '../../../module'
import { useSharedMouseInElement } from '../../composables/useSharedMouseInElement'
import { cn } from '../../utils/helpers'
import Primitive from '../Primitive/index.vue'

const {
  before = { color: 'rgb(var(--color-primary-50) / 0.3)', size: 600 },
  after = { color: 'rgb(var(--color-primary-50) / 0.1)', size: 400 },
  ...props
} = defineProps<{ before?: Flare; after?: Flare } & PrimitiveProps>()

const baseClass = 'FlareItem'

const target = templateRef<HTMLElement>('target')
const { elementX, elementY } = useSharedMouseInElement({ target })

const computedStyle = computed(() => {
  const b = before && {
    '--fbc': before ? before.color : '',
    '--fbs': `${before.size}px`,
  }

  const a = after && {
    '--fac': after.color,
    '--fas': `${after.size}px`,
  }

  return {
    '--x': `${Math.round(elementX.value)}px`,
    '--y': `${Math.round(elementY.value)}px`,
    ...b,
    ...a,
  }
})
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
