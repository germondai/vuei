<template>
  <component :is="tag" ref="trigger" class="cursor-pointer" @click="toggle">
    <slot />
  </component>
</template>

<script lang="ts" setup>
import { inject } from 'vue'

const { tag = 'div' } = defineProps<{ tag?: HTMLElement['tagName'] }>()

const trigger = inject('dialogTrigger', null)
const toggle = inject<(() => void) | null>('dialogToggle', null)
</script>
