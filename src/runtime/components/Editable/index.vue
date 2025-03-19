<script lang="ts">
import { type Ref, type WritableComputedRef, ref } from 'vue'
import EditableTrigger from './Trigger.vue'
import { useContext } from '../../composables/useContext'
import { useFallbackModel } from '../../composables/useFallbackModel'
import type { PrimitiveProps, TriggerProps } from '../../types'
import Primitive from '../Primitive/index.vue'

export type EditableContext = {
  trigger: Ref<HTMLElement | null>
  edit: WritableComputedRef<boolean | Ref<boolean, boolean>, boolean>
}

export const [injectEditableContext, provideEditableContext] =
  useContext<EditableContext>('Editable')
</script>

<script lang="ts" setup>
const { disabled, allowed, as, asChild, ...props } = defineProps<
  { modelValue?: boolean; allowed?: boolean } & TriggerProps & PrimitiveProps
>()
const emit = defineEmits<{ (e: 'update:modelValue', value: boolean): void }>()

const edit = useFallbackModel(props, 'modelValue', emit)

const trigger = ref<HTMLElement | null>(null)

provideEditableContext({
  trigger,
  edit,
})
</script>

<template>
  <Primitive :as :asChild class="group/EditableWrapper relative">
    <EditableTrigger
      v-if="allowed && !asChild"
      class="absolute top-2 right-2 flex items-center gap-1.5 text-primary-50/80 hover:text-primary-50 opacity-0 group-hover/EditableWrapper:opacity-100 transition-all z-20"
    >
      <Icon :name="edit ? 'mdi:pencil-off' : 'mdi:pencil'" class="size-5" />
    </EditableTrigger>
    <slot v-bind="{ edit }" />
  </Primitive>
</template>
