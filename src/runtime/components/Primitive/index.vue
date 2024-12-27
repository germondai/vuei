<template>
  <component :is="asTag" v-bind="$attrs">
    <slot v-if="!isSelfClosingTag" />
  </component>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { Slot } from './Slot'
import type { PrimitiveProps } from '../../../module'

const SELF_CLOSING_TAGS = ['area', 'img', 'input']

defineOptions({ inheritAttrs: false })

const { as = 'div', asChild } = defineProps<PrimitiveProps>()

const asTag = computed(() => (asChild ? Slot : as))

const isSelfClosingTag = computed(() => {
  if (typeof asTag.value !== 'string') return false
  return SELF_CLOSING_TAGS.includes(asTag.value)
})
</script>
