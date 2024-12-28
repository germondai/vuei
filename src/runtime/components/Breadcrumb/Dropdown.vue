<template>
  <Popover>
    <PopoverTrigger
      :as="trigger?.as || 'button'"
      :asChild="trigger?.asChild"
      :class="cn(baseClass.trigger, triggerClass)"
    >
      <slot name="trigger">
        <span v-for="key in 3" :key class="size-1 bg-primary-50 rounded-full" />
      </slot>
    </PopoverTrigger>
    <PopoverContent
      v-bind="$attrs"
      :as="content?.as"
      :asChild="content?.asChild"
      :class="cn(baseClass.content)"
    >
      <slot />
    </PopoverContent>
  </Popover>
</template>

<script lang="ts" setup>
import type { ClassValue } from 'clsx'
import type { PrimitiveProps } from '../../../module'
import { cn } from '../../utils/helpers'
import PopoverContent from '../Popover/Content.vue'
import Popover from '../Popover/index.vue'
import PopoverTrigger from '../Popover/Trigger.vue'

defineOptions({ inheritAttrs: false })

const { triggerClass, trigger, content } = defineProps<{
  triggerClass?: ClassValue
  trigger?: PrimitiveProps
  content?: PrimitiveProps
}>()

const baseClass: Record<'trigger' | 'content', ClassValue> = {
  trigger:
    'h-6 flex items-center justify-between gap-0.5 opacity-60 hover:opacity-80 transition-opacity',
  content: 'w-48 p-2 rounded-lg bg-primary-900/5 backdrop-blur shdw',
}
</script>
