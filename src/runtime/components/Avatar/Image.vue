<script lang="ts" setup>
import { injectAvatarContext } from './index.vue'
import type { PrimitiveProps } from '../../../module'
import Primitive from '../Primitive/index.vue'
import { NuxtImg } from '#components'

const { as = NuxtImg, asChild, ...props } = defineProps<{} & PrimitiveProps>()

const { imageLoadingStatus } = injectAvatarContext()
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
