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
import { injectDialogContext } from './index.vue'
import type { PrimitiveProps } from '../../../module'
import { cn } from '../../utils/helpers'
import Primitive from '../Primitive/index.vue'

const baseClass = 'cursor-pointer'

const { isOpen, trigger } = injectDialogContext()

const { ...props } = defineProps<{} & PrimitiveProps>()
</script>
