<template>
  <div
    class="relative w-full max-w-sm p-2 flex items-center gap-2 rounded-lg bg-primary-900/5 backdrop-blur pointer-events-auto overflow-hidden shdw"
  >
    <Icon
      v-if="toast.icon"
      :name="toast.icon.name"
      :style="{ color: toast.icon.color }"
      class="size-6 sm:size-8"
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
    <button
      class="absolute top-2 right-2 p-0.5 flex items-center justify-center rounded-lg shdw bg-primary-900/10 hover:bg-primary-900/20 transition-colors"
      @click="emit('remove', toast.id)"
    >
      <Icon name="mdi:close" class="size-4 sm:size-6" />
    </button>
  </div>
</template>

<script lang="ts" setup>
import type { Toast } from '../../composables/useToast'
import { Icon } from '#components'

const { toast } = defineProps<{ toast: Toast }>()

const emit = defineEmits<{
  (e: 'remove', id: Toast['id']): void
}>()
</script>
