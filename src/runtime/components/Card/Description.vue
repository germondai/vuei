<template>
  <component :is="tag" class="opacity-60">
    <slot />
  </component>
</template>

<script lang="ts" setup>
const { tag = 'p' } = defineProps<{ tag?: HTMLElement['tagName'] }>()
</script>
