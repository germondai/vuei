<template>
  <component :is="tag" class="text-xl font-bold">
    <slot />
  </component>
</template>

<script lang="ts" setup>
const { tag = 'b' } = defineProps<{ tag?: HTMLElement['tagName'] }>()
</script>
