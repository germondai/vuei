<template>
  <div
    class="ruler-x"
    :style="{ '--ruler-color': rulerColor, '--ruler-cross-color': crossColor }"
  >
    <div class="rx-bef" />
    <component
      :is="flare ? FlareItem : 'div'"
      v-bind="flare && flare"
      class="rx-mid"
    />
    <div class="rx-aft" />
  </div>
</template>

<script lang="ts" setup>
import type { Flare } from '../../types'
import FlareItem from '../Flare/Item.vue'

const {
  flare,
  rulerColor = 'rgb(var(--color-primary-800))',
  crossColor = 'rgb(var(--color-primary-700))',
} = defineProps<{
  flare?: Flare
  rulerColor?: HTMLElement['style']['backgroundColor']
  crossColor?: HTMLElement['style']['backgroundColor']
}>()
</script>

<style scoped>
.ruler-x {
  @apply relative w-[calc(100%+18px)] h-px -z-40 pointer-events-none;

  .rx-mid {
    @apply absolute -left-[10%] w-[120%] h-px z-10;
    background: linear-gradient(
      to right,
      transparent 0%,
      var(--ruler-color) 10%,
      var(--ruler-color) 90%,
      transparent 100%
    );
  }

  .rx-bef,
  .rx-aft {
    @apply absolute -top-[0.5px] z-20;

    &::before,
    &::after {
      @apply content-[''] absolute w-3 h-[2px] bg-[var(--ruler-cross-color)];
    }

    &::after {
      @apply rotate-90;
    }
  }

  .rx-bef {
    @apply left-0;

    &::before,
    &::after {
      @apply -left-[4.5px];
    }
  }

  .rx-aft {
    @apply right-0;

    &::before,
    &::after {
      @apply -right-[4.5px];
    }
  }
}
</style>
