<template>
  <Primitive
    ref="trigger"
    v-bind="props"
    :class="cn(baseClass)"
    @click="isOpen = !isOpen"
  >
    <slot />
  </Primitive>
</template>

<script lang="ts" setup>
import { type Ref, inject } from 'vue'
import type { PrimitiveProps } from '../../../module'
import { cn } from '../../utils/helpers'
import Primitive from '../Primitive/index.vue'

const baseClass = 'cursor-pointer'

const { ...props } = defineProps<{} & PrimitiveProps>()

const isOpen = inject<Ref<boolean>>('dialogState')

const trigger = inject<Ref<HTMLElement>>('dialogTrigger')
</script>
