<script lang="ts">
import { type ShallowRef, shallowRef } from 'vue'
import { useContext } from '../../composables/useContext'
import type { PrimitiveProps } from '../../types'
import Primitive from '../Primitive/index.vue'

export type ImageLoadingStatus = 'idle' | 'loading' | 'loaded' | 'error'

export type AvatarContext = {
  imageLoadingStatus: ShallowRef<ImageLoadingStatus>
}

export const [injectAvatarContext, provideAvatarContext] =
  useContext<AvatarContext>('Avatar')
</script>

<script lang="ts" setup>
const { ...props } = defineProps<{} & PrimitiveProps>()

provideAvatarContext({
  imageLoadingStatus: shallowRef<ImageLoadingStatus>('loading'),
})
</script>

<template>
  <Primitive
    v-bind="props"
    class="size-10 flex items-center justify-center rounded-full bg-primary-700 overflow-hidden"
  >
    <slot />
  </Primitive>
</template>
