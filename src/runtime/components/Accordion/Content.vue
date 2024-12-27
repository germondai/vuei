<template>
  <Primitive
    v-bind="props"
    ref="content"
    class="w-full h-0 overflow-hidden transition-all"
    :class="{ 'h-auto': isOpen }"
    :style="!isOpen && { padding: 'unset' }"
  >
    <slot />
  </Primitive>
</template>

<script lang="ts" setup>
import { type Ref, inject } from 'vue'
import type { PrimitiveProps } from '../../../module'
import Primitive from '../Primitive/index.vue'

const { ...props } = defineProps<{} & PrimitiveProps>()

const isOpen = inject<Ref<boolean>>('accordionState')

const content = inject<Ref<HTMLElement>>('accordionContent')
</script>
