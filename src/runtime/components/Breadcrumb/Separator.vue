<template>
  <Primitive :as :asChild :class="cn(baseClass)">
    <Icon :name="icon || 'mdi:chevron-right'" />
  </Primitive>
</template>

<script lang="ts" setup>
import type { PrimitiveProps } from '../../../module'
import { cn } from '../../utils/helpers'
import Primitive from '../Primitive/index.vue'
import { Icon } from '#components'

const {
  icon,
  as = 'li',
  asChild,
} = defineProps<{ icon?: string } & PrimitiveProps>()

const baseClass =
  'flex items-center justify-center opacity-60 pointer-events-none'
</script>
