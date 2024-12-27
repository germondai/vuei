<template>
  <div
    ref="content"
    class="w-full h-0 overflow-hidden transition-all"
    :class="{ 'h-auto': isOpen }"
  >
    <component :is="tag" v-bind="$attrs">
      <slot />
    </component>
  </div>
</template>

<script lang="ts" setup>
import { type Ref, inject } from 'vue'

defineOptions({ inheritAttrs: false })

const { tag = 'div' } = defineProps<{ tag?: HTMLElement['tagName'] }>()

const isOpen = inject<Ref<boolean>>('accordionState')

const content = inject<Ref<HTMLElement>>('accordionContent')
</script>
