<template>
  <component :is="tag" class="FlareCont">
    <slot />
  </component>
</template>

<script lang="ts" setup>
const { tag = 'div' } = defineProps<{ tag?: HTMLElement['tagName'] }>()

// use this component only if you want to light up the item only on cont hover
// otherwise its useless
</script>

<style>
.FlareCont {
  .FlareItem {
    &::after,
    &::before {
      opacity: 0;
    }
  }

  &:hover .FlareItem {
    &::after,
    &::before {
      opacity: 1;
    }
  }
}
</style>
