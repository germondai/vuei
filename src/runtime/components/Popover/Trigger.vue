<template>
  <component :is="tag" ref="trigger" class="cursor-pointer" @click="toggle">
    <slot />
  </component>
</template>

<script lang="ts" setup>
import { inject } from 'vue'

const { tag = 'div' } = defineProps<{ tag?: HTMLElement['tagName'] }>()

const toggle = inject('popoverToggle', null)
const trigger = inject('popoverTrigger', null)
</script>
