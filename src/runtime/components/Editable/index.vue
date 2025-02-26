<template>
  <Primitive :as :asChild class="group/EditableWrapper relative">
    <button
      v-if="allowed"
      class="absolute top-2 right-2 flex items-center gap-1.5 text-primary-50/80 hover:text-primary-50 opacity-0 group-hover/EditableWrapper:opacity-100 transition-all z-20"
      @click="!disabled && (edit = !edit)"
    >
      <Icon :name="edit ? 'mdi:pencil-off' : 'mdi:pencil'" class="size-5" />
    </button>
    <slot v-bind="{ edit }" />
  </Primitive>
</template>

<script lang="ts" setup>
import { useFallbackModel } from '../../composables/useFallbackModel'
import type { PrimitiveProps, TriggerProps } from '../../types'
import Primitive from '../Primitive/index.vue'

const { disabled, allowed, as, asChild, ...props } = defineProps<
  { modelValue?: boolean; allowed?: boolean } & TriggerProps & PrimitiveProps
>()
const emit = defineEmits<{ (e: 'update:modelValue', value: boolean): void }>()

const edit = useFallbackModel(props, 'modelValue', emit)
</script>
