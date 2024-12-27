<template>
  <component
    :is="tag"
    ref="trigger"
    class="cursor-pointer"
    @click="isOpen = !isOpen"
  >
    <slot />
  </component>
</template>

<script lang="ts" setup>
import { type Ref, inject } from 'vue'

const { tag = 'div' } = defineProps<{ tag?: HTMLElement['tagName'] }>()

const isOpen = inject<Ref<boolean>>('dialogState')

const trigger = inject<Ref<HTMLElement>>('dialogTrigger')
</script>
