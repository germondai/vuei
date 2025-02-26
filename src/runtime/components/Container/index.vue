<template>
  <Primitive v-bind="props" :class="cn(baseClass, sizeClass)">
    <slot />
  </Primitive>
</template>

<script lang="ts" setup>
import type { ClassValue } from 'clsx'
import { computed } from 'vue'
import type { PrimitiveProps } from '../../types'
import { cn } from '../../utils/cn'
import Primitive from '../Primitive/index.vue'

type ContainerSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'
type ContainerMode = 'base' | 'max' | 'both'

const {
  size = 'lg',
  mode,
  ...props
} = defineProps<
  {
    size?: ContainerSize
    mode?: ContainerMode
  } & PrimitiveProps
>()

const baseClass = 'relative mx-auto'

const sizes: Partial<
  Record<ContainerSize, Partial<Record<ContainerMode, ClassValue>>>
> = {}

sizes.xs = {
  base: `w-[98%] xs:w-[95%]`,
  max: `md:max-w-screen-md`,
}

sizes.sm = {
  base: `${sizes.xs.base} md:w-11/12`,
  max: `${sizes.xs.max} lg:max-w-screen-lg`,
}

sizes.md = {
  base: `${sizes.sm.base} lg:w-5/6`,
  max: `${sizes.sm.max} xl:max-w-screen-xl`,
}

sizes.lg = {
  base: `${sizes.md.base} xl:w-4/5`,
  max: `${sizes.md.max} 2xl:max-w-screen-2xl`,
}

sizes.xl = {
  base: `${sizes.lg.base}`,
  max: `${sizes.lg.max} 3xl:max-w-screen-3xl`,
}

const sizeClass = computed(() =>
  mode === 'base' || mode === 'max'
    ? sizes[size]?.[mode]
    : [sizes[size]?.base, sizes[size]?.max],
)
</script>
