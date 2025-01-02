<template>
  <Popover v-model:opened="opened">
    <PopoverTrigger
      ref="trigger"
      v-bind="$attrs"
      :class="cn(baseClass.trigger, sizes[size])"
      asChild
    >
      <button type="button">
        <span class="flex gap-4 items-center truncate">
          <Icon
            v-if="selectedItem.icon"
            :name="selectedItem.icon"
            class="size-6"
          />
          {{ selectedItem.name }}
        </span>
        <span
          class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2"
        >
          <Icon name="ph:caret-up-down-fill" class="size-6" />
        </span>
      </button>
    </PopoverTrigger>
    <PopoverContent
      :class="cn(baseClass.content)"
      :style="{ width: `${triggerWidth}px` }"
    >
      <div
        v-if="searchable"
        class="relative flex items-center border-b-[1px] border-primary-800"
      >
        <label :for="id" class="absolute px-2 flex items-center cursor-pointer">
          <Icon name="mdi:magnify" class="size-6" />
        </label>
        <input
          :id="id"
          v-model="search"
          :class="
            cn(
              'w-full pl-10 pr-2 bg-transparent rounded-t-lg outline-0',
              sizes[size],
            )
          "
          :placeholder="searchPlaceholder"
        />
      </div>
      <div
        class="h-max flex flex-col overflow-auto"
        :style="{
          maxHeight: `${triggerHeight * (visibleResultsCount || (searchable ? 3 : 4))}px`,
        }"
      >
        <div
          v-for="opt in filteredOptions"
          :key="opt.id"
          :class="
            cn(
              'cursor-pointer flex gap-4 items-center relative select-none px-4 transition-colors',
              isActive(opt) ? 'bg-primary-700' : 'hover:bg-primary-800',
              sizes[size],
            )
          "
          @click="selectedItem = opt"
        >
          <Icon v-if="opt.icon" :name="opt.icon" class="size-6" />
          {{ opt.name }}
        </div>
        <div v-if="!filteredOptions.length" class="p-4 opacity-60">
          No items available.
        </div>
      </div>
    </PopoverContent>
  </Popover>
</template>

<script lang="ts" setup generic="T">
import { useElementBounding } from '@vueuse/core'
import type { ClassValue } from 'clsx'
import { computed, useId, useTemplateRef } from 'vue'
import type { OptionItem } from '../../../module'
import { useFallbackModel } from '../../composables/useFallbackModel'
import { cn, searchObjectByFieldValues } from '../../utils/helpers'
import PopoverContent from '../Popover/Content.vue'
import Popover from '../Popover/index.vue'
import PopoverTrigger from '../Popover/Trigger.vue'
import { Icon } from '#components'

type Size = 'sm' | 'md' | 'lg'

defineOptions({ inheritAttrs: false })

const baseClass: Record<'trigger' | 'content', ClassValue> = {
  trigger:
    'relative w-full pl-3 pr-10 rounded-lg bg-primary-900 hover:bg-primary-800 transition-colors shdw',
  content: 'rounded-lg bg-primary-900 shdw overflow-hidden',
}

const sizes: Record<Size, ClassValue> = {
  sm: 'py-2',
  md: 'py-2.5',
  lg: 'py-3',
}

const id = useId()

const {
  items,
  size = 'md',
  visibleResultsCount,
  searchPlaceholder = 'Search...',
  searchable,
  collapsible,
  required,
  ...props
} = defineProps<{
  selectedItem?: OptionItem<T> | null
  opened?: boolean
  search?: string
  items: OptionItem<T>[]
  size?: Size
  visibleResultsCount?: number
  searchPlaceholder?: string
  searchable?: boolean
  collapsible?: boolean
  required?: boolean
}>()

const emit = defineEmits<{
  (e: 'update:selectedItem', value: OptionItem<T>): void
  (e: 'update:opened', value: boolean): void
  (e: 'update:search', value: string): void
}>()

const emptyOption: OptionItem<T> = { id: '', name: 'Select an option' }

const selectedItem = useFallbackModel(props, 'selectedItem', emit, {
  fallback: (val) => (required ? val || items[0] : val || emptyOption),
  onUpdate: () => collapsible && (opened.value = false),
})
const opened = useFallbackModel(props, 'opened', emit)
const search = useFallbackModel(props, 'search', emit)

const filteredOptions = computed(() => {
  const baseOptions = !required ? [emptyOption, ...items] : items
  if (!search.value) return baseOptions
  return searchObjectByFieldValues(baseOptions, search.value, ['name', 'id'])
})

const isActive = (option: OptionItem<T>) => option.id === selectedItem.value.id

const trigger = useTemplateRef<HTMLElement>('trigger')
const { width: triggerWidth, height: triggerHeight } =
  useElementBounding(trigger)
</script>
