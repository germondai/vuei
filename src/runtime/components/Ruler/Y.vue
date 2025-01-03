<template>
  <div class="ruler-y" :style="{ '--ruler-color': color }">
    <component
      :is="flare ? FlareItem : 'div'"
      v-for="key in ['ry-l', 'ry-r']"
      v-show="
        (left && key === 'ry-l') ||
        (right && key === 'ry-r') ||
        (!left && !right)
      "
      :key
      :class="key"
      v-bind="flare && flare"
    />
  </div>
</template>

<script lang="ts" setup>
import type { Flare } from '../../types'
import FlareItem from '../Flare/Item.vue'

const {
  flare,
  left = false,
  right = false,
  color = 'rgb(var(--color-primary-800))',
} = defineProps<{
  flare?: Flare
  left?: boolean
  right?: boolean
  color?: HTMLElement['style']['backgroundColor']
}>()
</script>

<style scoped>
.ruler-y {
  @apply contents pointer-events-none -z-50;

  .ry-l,
  .ry-r {
    @apply content-[''] absolute -top-[12.5%] w-px h-[125%] pointer-events-none -z-50;
    background: linear-gradient(
      to bottom,
      transparent 0%,
      var(--ruler-color) 10%,
      var(--ruler-color) 90%,
      transparent 100%
    );
  }

  .ry-l {
    @apply -left-2;
  }

  .ry-r {
    @apply -right-2;
  }
}
</style>
