<template>
  <component :is="tag" class="pointer-events-none">
    <slot />
  </component>
</template>

<script lang="ts" setup>
const { tag = 'div' } = defineProps<{ tag?: HTMLElement['tagName'] }>()
</script>
