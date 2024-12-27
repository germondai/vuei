<template>
  <Primitive
    v-bind="props"
    ref="trigger"
    class="cursor-pointer"
    @click="isOpen = !isOpen"
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

const trigger = inject<Ref<HTMLElement>>('accordionTrigger')
</script>
