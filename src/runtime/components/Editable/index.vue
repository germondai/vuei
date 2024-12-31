<template>
  <Primitive v-bind="props" class="group/EditableWrapper relative">
    <button
      v-if="allowed"
      class="absolute top-2 right-2 flex items-center gap-1.5 text-primary-50/80 hover:text-primary-50 opacity-0 group-hover/EditableWrapper:opacity-100 transition-all z-20"
      @click="value = !value"
    >
      <Icon :name="value ? 'mdi:pencil-off' : 'mdi:pencil'" class="size-5" />
    </button>
    <slot v-bind="{ edit: value }" />
  </Primitive>
</template>

<script lang="ts" setup>
import { type MaybeRef, computed, isRef, ref } from 'vue'
import type { PrimitiveProps } from '../../../module'
import Primitive from '../Primitive/index.vue'

const { edit, allowed, ...props } = defineProps<
  {
    edit?: MaybeRef<boolean>
    allowed?: boolean
  } & PrimitiveProps
>()
const emit = defineEmits<{ (e: 'update:edit', value: boolean): void }>()

const fallbackValue = ref<boolean>(false)
const value = computed({
  get: () => edit || fallbackValue.value,
  set: (value: boolean) =>
    edit !== undefined && isRef(edit)
      ? emit('update:edit', value)
      : (fallbackValue.value = value),
})
</script>
