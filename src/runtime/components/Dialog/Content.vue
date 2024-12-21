<template>
  <Teleport to="#teleports">
    <Transition :name="transition">
      <component
        :is="tag"
        v-show="isOpen"
        v-if="isOpen || childIsOpen"
        class="fixed inset-0 size-full p-4 grid place-items-center z-[999]"
        :class="backgroundClass"
      >
        <div ref="content" v-bind="$attrs" class="overflow-y-auto max-h-full">
          <slot />
        </div>
      </component>
    </Transition>
  </Teleport>
</template>

<script lang="ts" setup>
import {
  type ComputedRef,
  type HTMLAttributes,
  type Ref,
  inject,
  ref,
} from 'vue'

defineOptions({ inheritAttrs: false })

const isOpen = inject<Ref<boolean>>('dialogState', ref(false))
const content = inject<Ref<HTMLElement> | null>('dialogContent', null)

const childIsOpen = inject<ComputedRef<boolean> | boolean>(
  'dialogChildState',
  false,
)

const {
  tag = 'div',
  backgroundClass,
  transition = 'fade',
} = defineProps<{
  tag?: HTMLElement['tagName']
  backgroundClass?: HTMLAttributes['class']
  transition?: 'fade'
}>()
</script>
