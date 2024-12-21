<template>
  <component
    :is="tag"
    :class="{
      'cont-xs': size === 'xs',
      'cont-sm': size === 'sm',
      'cont-md': size === 'md',
      'cont-lg': size === 'lg',
      'cont-xl': size === 'xl',
    }"
  >
    <slot />
  </component>
</template>

<script lang="ts" setup>
const { tag = 'div', size = 'lg' } = defineProps<{
  tag?: HTMLElement['tagName']
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
}>()
</script>

<style scoped>
.cont {
  @apply relative mx-auto;
}

.cont-xs {
  @apply cont;
  @apply w-[98%] xs:w-[95%];
  @apply md:max-w-screen-md;
}

.cont-sm {
  @apply cont-xs;
  @apply md:w-11/12;
  @apply lg:max-w-screen-lg;
}

.cont-md {
  @apply cont-sm;
  @apply lg:w-5/6;
  @apply xl:max-w-screen-xl;
}

.cont-lg {
  @apply cont-md;
  @apply xl:w-4/5;
  @apply 2xl:max-w-screen-2xl;
}

.cont-xl {
  @apply cont-lg;
  @apply 3xl:max-w-screen-3xl;
}
</style>
