<template>
  <component :is="tag" class="flex flex-col text-center sm:text-left">
    <slot />
  </component>
</template>

<script lang="ts" setup>
const { tag = 'div' } = defineProps<{ tag?: HTMLElement['tagName'] }>()
</script>
