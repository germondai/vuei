<template>
  <Primitive
    ref="trigger"
    v-bind="props"
    :class="cn(baseClass)"
    @click="!disabled && (edit = !edit)"
  >
    <slot />
  </Primitive>
</template>

<script lang="ts" setup>
import { injectEditableContext } from './index.vue'
import type { PrimitiveProps, TriggerProps } from '../../types'
import { cn } from '../../utils/cn'
import Primitive from '../Primitive/index.vue'

const baseClass = 'cursor-pointer'

const { edit, trigger } = injectEditableContext()

const { disabled, ...props } = defineProps<{} & TriggerProps & PrimitiveProps>()
</script>
