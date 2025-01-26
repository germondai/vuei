<template>
  <input
    v-if="edit"
    v-model="val"
    type="text"
    placeholder="Tag"
    :class="cn(baseClass)"
    @input="emit('input', $event)"
    @keyup="emit('keyup', $event)"
    @focusout="emit('focusout')"
    @submit.prevent
  />
  <Primitive v-else-if="val" :as :asChild :title="val" :class="cn(baseClass)">
    {{ val }}
  </Primitive>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useFallbackModel } from '../../composables/useFallbackModel'
import type { PrimitiveProps, Tag } from '../../types'
import { cn } from '../../utils/cn'
import Primitive from '../Primitive/index.vue'

const baseClass =
  'px-2.5 py-0.5 text-xs rounded-full bg-primary-800 hover:bg-primary-800/80 shdw transition-colors'

const {
  as,
  asChild,
  edit = false,
  ...props
} = defineProps<
  {
    edit?: boolean
    modelValue?: Tag
  } & PrimitiveProps
>()
const emit = defineEmits<{
  (e: 'update:modelValue', value: Tag): void
  (e: 'input', event: Event): void
  (e: 'keyup', event: KeyboardEvent): void
  (e: 'focusout'): void
}>()

const value = useFallbackModel(props, 'modelValue', emit)

const val = computed({
  get: () => (typeof value.value === 'object' ? value.value.name : value.value),
  set: (val) =>
    val && typeof value.value === 'object'
      ? (value.value.name = val)
      : (value.value = val),
})
</script>
