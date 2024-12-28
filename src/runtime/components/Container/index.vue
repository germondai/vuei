<template>
  <Primitive :as :asChild :class="cn(baseClass, sizes[size])">
    <slot />
  </Primitive>
</template>

<script lang="ts" setup>
import type { ClassValue } from 'clsx'
import type { PrimitiveProps } from '../../../module'
import { cn } from '../../utils/helpers'
import Primitive from '../Primitive/index.vue'

type ContainerSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

const {
  size = 'lg',
  as = 'div',
  asChild,
} = defineProps<{ size?: ContainerSize } & PrimitiveProps>()

const baseClass = 'relative mx-auto'

const sizes: Partial<Record<ContainerSize, ClassValue>> = {}
sizes.xs = 'w-[98%] xs:w-[95%] md:max-w-screen-md'
sizes.sm = sizes.xs + 'md:w-11/12 lg:max-w-screen-lg'
sizes.md = sizes.sm + 'lg:w-5/6 xl:max-w-screen-xl'
sizes.lg = sizes.md + 'xl:w-4/5 2xl:max-w-screen-2xl'
sizes.xl = sizes.lg + '3xl:max-w-screen-3xl'
</script>
