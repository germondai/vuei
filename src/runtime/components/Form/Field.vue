<template>
  <div :class="wrapperClass">
    <component :is="flare ? FlareItem : 'div'" class="field rounded-lg">
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
  </div>
</template>

<script lang="ts" setup>
import { useVModel } from '@vueuse/core'
import { type HTMLAttributes, type InputHTMLAttributes, useId } from 'vue'
import { useValidate } from '../../composables/useValidate'
import FlareItem from '../Flare/Item.vue'

type MV = string | number | boolean | null

defineOptions({ inheritAttrs: false })

const id = useId()

const {
  flare = false,
  schema,
  type = 'text',
  label = true,
  wrapperClass,
  ...props
} = defineProps<{
  flare?: boolean
  schema?: object
  type?: InputHTMLAttributes['type'] | 'textarea'
  label?: boolean
  wrapperClass?: HTMLAttributes['class']
  modelValue?: MV
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value?: MV): void
}>()

const value = useVModel(props, 'modelValue', emit)

const { validateField } = useValidate()

const { validate, errors, specs } = validateField(schema, value)
</script>
