<template>
  <button
    class="relative flex items-center w-12 h-6 p-0.5 rounded-full shdw transition-colors"
    :class="{ 'bg-red-200/20': value }"
    @click="value = !value"
  >
    <span
      class="size-5 rounded-full bg-white transition-transform pointer-events-none"
      :class="{ 'translate-x-6': value }"
    />
  </button>
</template>

<script lang="ts" setup>
import { useVModel } from '@vueuse/core'

const props = defineProps<{ modelValue?: boolean }>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()

const value = useVModel(props, 'modelValue', emit)
</script>
