<script lang="ts" setup>
import { injectAvatarContext } from './index.vue'
import type { PrimitiveProps } from '../../types'
import Primitive from '../Primitive/index.vue'

const { imageLoadingStatus } = injectAvatarContext()

const { ...props } = defineProps<{} & PrimitiveProps>()
</script>

<template>
  <Primitive
    v-if="imageLoadingStatus !== 'loaded'"
    v-bind="props"
    class="min-w-full size-full flex items-center justify-center leading-none"
  >
    <slot />
  </Primitive>
</template>
