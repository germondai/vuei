<template>
  <Primitive v-bind="props" :class="cn(baseClass)">
    <Icon
      v-if="toast.icon"
      :name="toast.icon.name"
      :style="{ color: toast.icon.color }"
      class="min-w-6 size-6 sm:min-w-8 sm:size-8"
    />
    <div class="w-full flex flex-col overflow-hidden">
      <b class="sm:test-xl">{{ toast.title }}</b>
      <p
        v-if="toast.message"
        class="max-sm:text-sm line-clamp-3 break-words opacity-60"
      >
        {{ toast.message }}
      </p>
    </div>
    <ToastButton
      v-if="removeable"
      class="group-hover/ToastItem:opacity-100 opacity-0 absolute -top-2 -left-2"
      icon="mdi:close"
      @click.stop="emit('remove', toast.id)"
    />
  </Primitive>
</template>

<script lang="ts" setup>
import type { PrimitiveProps, Toast } from '../../types'
import { cn } from '../../utils/cn'
import Primitive from '../Primitive/index.vue'
import ToastButton from '../Toast/Button.vue'
import { Icon } from '#components'

const baseClass =
  'group/ToastItem relative w-full max-w-sm p-2 flex items-center gap-2 rounded-2xl bg-primary-900/5 backdrop-blur pointer-events-auto shdw'

const {
  toast,
  removeable = true,
  ...props
} = defineProps<{ toast: Toast; removeable?: boolean } & PrimitiveProps>()

const emit = defineEmits<{ (e: 'remove', id: Toast['id']): void }>()
</script>
