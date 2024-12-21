<template>
  <component :is="tag">
    <slot />
  </component>
</template>

<script lang="ts" setup>
import { provide, ref } from 'vue'

const { tag = 'div' } = defineProps<{ tag?: HTMLElement['tagName'] }>()

const trigger = ref<HTMLElement>()

const isOpen = ref<boolean>(false)

const toggleAccordion = () => (isOpen.value = !isOpen.value)

provide('accordionTrigger', trigger)
provide('accordionState', isOpen)
provide('accordionToggle', toggleAccordion)
</script>
