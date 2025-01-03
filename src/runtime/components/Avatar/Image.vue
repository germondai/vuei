<script lang="ts" setup>
import { injectAvatarContext } from './index.vue'
import type { PrimitiveProps } from '../../types'
import Primitive from '../Primitive/index.vue'
import { NuxtImg } from '#components'

const { imageLoadingStatus } = injectAvatarContext()

const { as = NuxtImg, asChild, ...props } = defineProps<{} & PrimitiveProps>()
</script>

<template>
  <Primitive
    v-show="imageLoadingStatus === 'loaded'"
    :as
    :asChild
    v-bind="props"
    role="img"
    class="size-full rounded-[inherit] object-cover"
    @load="imageLoadingStatus = 'loaded'"
    @error="imageLoadingStatus = 'error'"
  >
    <slot />
  </Primitive>
</template>
