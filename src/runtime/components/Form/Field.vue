<template>
  <Primitive
    :as="wrapper?.as"
    :asChild="wrapper?.asChild"
    :class="cn(wrapper?.class)"
  >
    <slot name="wrapper" />
    <component
      :is="flare ? FlareItem : Primitive"
      :as="field?.as"
      :asChild="field?.asChild"
      :class="cn('field rounded-lg', field?.class)"
    >
      <slot name="field" />
      <textarea
        v-if="type === 'textarea' && typeof value !== 'boolean'"
        v-bind="$attrs"
        :id="$attrs.id?.toString() || id"
        v-model="value"
        :placeholder="$attrs.placeholder?.toString() || ''"
        :required="schema ? !schema.isOptional() : $attrs.required === ''"
        @focusout="validate"
      />
      <input
        v-else
        v-bind="$attrs"
        :id="$attrs.id?.toString() || id"
        v-model="value"
        :type
        :placeholder="$attrs.placeholder?.toString() || ''"
        :required="schema ? !schema.isOptional() : $attrs.required === ''"
        @focusout="validate"
      />
      <label v-if="label" :for="$attrs.id?.toString() || id">
        <slot />
      </label>
    </component>
    <ul v-if="errors.length > 0">
      <li v-for="(error, index) in errors" :key="index">
        <span role="alert">{{ error }}</span>
      </li>
    </ul>
  </Primitive>
</template>

<script
  lang="ts"
  setup
  generic="T extends InputHTMLAttributes['type'] | 'textarea'"
>
import type { ClassValue } from 'clsx'
import { type InputHTMLAttributes, shallowRef, unref, useId, watch } from 'vue'
import type { ZodType } from 'zod'
import { useFallbackModel } from '../../composables/useFallbackModel'
import type { PrimitiveProps } from '../../types'
import { cn } from '../../utils/cn'
import FlareItem from '../Flare/Item.vue'
import Primitive from '../Primitive/index.vue'

interface PrimitiveElProp extends PrimitiveProps {
  class?: ClassValue
}

type MV = T extends 'datetime-local' | 'date'
  ? Date
  : T extends 'checkbox'
    ? boolean
    : string | number | null

defineOptions({ inheritAttrs: false })

const id = useId()

const {
  flare = false,
  schema,
  type = 'text',
  label = true,
  wrapper,
  field,
  ...props
} = defineProps<{
  modelValue?: MV
  flare?: boolean
  schema?: ZodType
  type?: T
  label?: boolean
  wrapper?: PrimitiveElProp
  field?: PrimitiveElProp
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value?: MV): void
  (e: 'error', value: string[]): void
}>()

const value = useFallbackModel(props, 'modelValue', emit, {
  onUpdate: () => validate(),
})

const errors = shallowRef<string[]>([])

const validate = () => {
  if (!schema) return
  const { error } = schema.safeParse(unref(value))
  if (!error) return (errors.value = [])
  errors.value = error.errors.map((e) => e.message)
}

watch(errors, () => errors.value.length > 0 && emit('error', errors.value))
</script>
