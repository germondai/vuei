<template>
  <component :is="tag" class="p-4 flex flex-col gap-4 rounded-lg shdw">
    <slot />
  </component>
</template>

<script lang="ts" setup>
const { tag = 'div' } = defineProps<{ tag?: HTMLElement['tagName'] }>()
</script>
