<template>
  <Teleport to="#teleports">
    <Transition :name="transition">
      <div
        v-show="opened"
        v-if="opened || childOpened"
        :class="cn(baseClass.background, backgroundClass)"
      >
        <Primitive
          ref="content"
          v-bind="{ ...props, ...$attrs }"
          :class="cn(baseClass.content)"
        >
          <slot />
        </Primitive>
      </div>
    </Transition>
  </Teleport>
</template>

<script lang="ts" setup>
import type { HTMLAttributes } from 'vue'
import { injectDialogContext } from './index.vue'
import type { PrimitiveProps } from '../../../module'
import { cn } from '../../utils/helpers'
import Primitive from '../Primitive/index.vue'

const baseClass: Record<'background' | 'content', string> = {
  background:
    'fixed inset-0 size-full p-4 grid place-items-center bg-black/80 z-[999]',
  content: 'overflow-y-auto max-h-full',
}

defineOptions({ inheritAttrs: false })

const { opened, content, childOpened } = injectDialogContext()

const {
  transition = 'fade',
  backgroundClass,
  ...props
} = defineProps<
  {
    transition?: 'fade'
    backgroundClass?: HTMLAttributes['class']
  } & PrimitiveProps
>()
</script>
