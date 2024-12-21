<template>
  <component
    :is="tag"
    class="flex flex-col-reverse sm:flex-row sm:justify-end gap-0.5 sm:gap-2"
  >
    <slot />
  </component>
</template>

<script lang="ts" setup>
const { tag = 'div' } = defineProps<{ tag?: HTMLElement['tagName'] }>()
</script>
