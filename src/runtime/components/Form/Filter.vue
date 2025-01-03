<template>
  <Primitive :as :asChild :class="cn(baseClass.root)">
    <Button
      v-for="item in items"
      :key="item.id"
      :icon="item.icon"
      :size
      :selected="selectedItem?.id === item.id"
      :variant="selectedItem?.id === item.id ? 'primary' : 'outline'"
      :class="cn(baseClass.button)"
      @click="selectedItem = item"
    >
      {{ item.name }}
    </Button>
  </Primitive>
</template>

<script lang="ts" setup generic="T">
import type { ClassValue } from 'clsx'
import { useFallbackModel } from '../../composables/useFallbackModel'
import type { ButtonProps, OptionItem, PrimitiveProps } from '../../types'
import { cn } from '../../utils/cn'
import Button from '../Button/index.vue'
import Primitive from '../Primitive/index.vue'

const baseClass: Record<'root' | 'button', ClassValue> = {
  root: 'flex flex-row gap-2 sm:gap-4 flex-wrap',
  button: 'justify-center max-sm:flex-grow',
}

const { items, size, required, as, asChild, ...props } = defineProps<
  {
    selectedItem?: OptionItem<T> | null
    items: OptionItem<T>[]
    size?: ButtonProps['size']
    required?: boolean
  } & PrimitiveProps
>()

const emit = defineEmits<{
  (e: 'update:selectedItem', value: OptionItem<T>): void
}>()

const selectedItem = useFallbackModel(props, 'selectedItem', emit, {
  fallback: (val) => (required ? val || items[0] : val || null),
})
</script>
