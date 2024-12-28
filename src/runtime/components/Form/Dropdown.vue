<template>
  <Popover v-model:isOpen="isOpen">
    <PopoverTrigger
      ref="trigger"
      class="relative w-full pl-3 pr-10 rounded-lg bg-primary-900 hover:bg-primary-800 transition-colors text-left cursor-pointer shdw"
      :style
    >
      <span class="flex gap-4 items-center truncate">
        <Icon v-if="selected.icon" :name="selected.icon" class="size-6" />
        {{ selected.name }}
      </span>
      <span
        class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2"
      >
        <Icon name="ph:caret-up-down-fill" class="size-6" />
      </span>
    </PopoverTrigger>
    <PopoverContent
      class="rounded-lg bg-primary-900 shdw overflow-hidden"
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
          class="w-full pl-10 px-2 bg-transparent rounded-t-lg outline-0"
          :style
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
          :class="[
            'cursor-pointer flex gap-4 items-center relative select-none px-4 transition-colors',
            isActive(opt) ? 'bg-primary-700 ' : 'hover:bg-primary-800 ',
          ]"
          :style
          @click="selectOption(opt)"
        >
          <Icon v-if="opt.icon" :name="opt.icon" class="size-6" />
          {{ opt.name }}
        </div>
        <div v-if="!filteredOptions.length" class="p-4 opacity-60">
          No options available.
        </div>
      </div>
    </PopoverContent>
  </Popover>
</template>

<script lang="ts" setup generic="T">
import { useElementBounding } from '@vueuse/core'
import { computed, ref, useId, useTemplateRef } from 'vue'
import type { OptionItem } from '../../../module'
import { searchObjectByFieldValues } from '../../utils/helpers'
import PopoverContent from '../Popover/Content.vue'
import Popover from '../Popover/index.vue'
import PopoverTrigger from '../Popover/Trigger.vue'
import { Icon } from '#components'

const id = useId()

const {
  selectedItem,
  options,
  size = 'md',
  visibleResultsCount,
  searchPlaceholder = 'Search...',
  searchable,
  collapsible,
  required,
} = defineProps<{
  selectedItem: OptionItem<T> | null
  options: OptionItem<T>[]
  size?: 'sm' | 'md' | 'lg'
  visibleResultsCount?: number
  searchPlaceholder?: string
  searchable?: boolean
  collapsible?: boolean
  required?: boolean
}>()

const emit = defineEmits<{
  (e: 'update:selectedItem', value: OptionItem<T>): void
}>()

const emptyOption: OptionItem<T> = { id: '', name: 'Select an option' }

const selected = computed(
  () => selectedItem || (!required ? emptyOption : options[0] || emptyOption),
)

const filteredOptions = computed(() => {
  const baseOptions = !required ? [emptyOption, ...options] : options
  if (!search.value) return baseOptions
  return searchObjectByFieldValues(baseOptions, search.value, ['name', 'id'])
})

const selectOption = (option: OptionItem<T>) => {
  emit('update:selectedItem', option)
  if (collapsible) isOpen.value = false
}

const isActive = (option: OptionItem<T>) => option.id === selected.value.id

const trigger = useTemplateRef<HTMLElement>('trigger')
const { width: triggerWidth, height: triggerHeight } =
  useElementBounding(trigger)

const isOpen = ref<boolean>(false)

const search = ref<string>('')

const style = computed(() => {
  const val = `${size === 'lg' ? 0.75 : size === 'sm' ? 0.5 : 0.625}rem`
  return { paddingTop: val, paddingBottom: val }
})
</script>
