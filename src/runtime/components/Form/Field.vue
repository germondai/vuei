<template>
  <Primitive
    :as="wrapper?.as"
    :asChild="wrapper?.asChild"
    :class="cn(wrapper?.class)"
  >
    <component
      :is="flare ? FlareItem : Primitive"
      :as="field?.as"
      :asChild="field?.asChild"
      :class="cn('field rounded-lg', field?.class)"
    >
      <textarea
        v-if="type === 'textarea' && typeof value !== 'boolean'"
        v-bind="$attrs"
        :id="$attrs.id?.toString() || id"
        v-model="value"
        :placeholder="$attrs.placeholder?.toString() || ''"
        :required="specs ? !specs.optional : $attrs.required === ''"
        @input="validate"
        @blur="validate"
      />
      <input
        v-else
        v-bind="$attrs"
        :id="$attrs.id?.toString() || id"
        v-model="value"
        :type
        :placeholder="$attrs.placeholder?.toString() || ''"
        :required="specs ? !specs.optional : $attrs.required === ''"
        @input="validate"
        @blur="validate"
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

<script lang="ts" setup>
import type { ClassValue } from 'clsx'
import { type InputHTMLAttributes, useId } from 'vue'
import type { PrimitiveProps } from '../../../module'
import { useFallbackModel } from '../../composables/useFallbackModel'
import { useValidate } from '../../composables/useValidate'
import { cn } from '../../utils/helpers'
import FlareItem from '../Flare/Item.vue'
import Primitive from '../Primitive/index.vue'

interface PrimitiveElProp extends PrimitiveProps {
  class?: ClassValue
}

type MV = string | number | boolean | null

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
  schema?: object
  type?: InputHTMLAttributes['type'] | 'textarea'
  label?: boolean
  wrapper?: PrimitiveElProp
  field?: PrimitiveElProp
}>()

const emit = defineEmits<{ (e: 'update:modelValue', value?: MV): void }>()

const value = useFallbackModel(props, 'modelValue', emit)

const { validateField } = useValidate()

const { validate, errors, specs } = validateField(schema, value)
</script>
