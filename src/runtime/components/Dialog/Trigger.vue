<template>
  <Primitive
    ref="trigger"
    v-bind="props"
    :class="cn(baseClass)"
    @click="!disabled && (opened = !opened)"
  >
    <slot />
  </Primitive>
</template>

<script lang="ts" setup>
import { injectDialogContext } from './index.vue'
import type { PrimitiveProps, TriggerProps } from '../../types'
import { cn } from '../../utils/cn'
import Primitive from '../Primitive/index.vue'

const baseClass = 'cursor-pointer'

const { opened, trigger } = injectDialogContext()

const { disabled, ...props } = defineProps<{} & TriggerProps & PrimitiveProps>()
</script>
