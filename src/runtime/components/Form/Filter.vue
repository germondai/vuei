<template>
  <Primitive v-bind="props" :class="cn(baseClass)">
    <Button
      v-for="tab in tabs"
      :key="tab.id"
      :icon="tab.icon"
      :size
      :selected="selectedTab.id === tab.id"
      :variant="selectedTab.id === tab.id ? 'primary' : 'ghost'"
      class="justify-center max-sm:flex-grow"
      @click="emit('update:tabSelect', tab)"
    >
      {{ tab.name }}
    </Button>
  </Primitive>
</template>

<script lang="ts" setup generic="T">
import type { ButtonProps, OptionItem, PrimitiveProps } from '../../../module'
import { cn } from '../../utils/helpers'
import Button from '../Button/index.vue'
import Primitive from '../Primitive/index.vue'

const baseClass = 'flex flex-row gap-2 sm:gap-4 flex-wrap'

const { selectedTab, tabs, size, ...props } = defineProps<
  {
    selectedTab: OptionItem<T>
    tabs: OptionItem<T>[]
    size?: ButtonProps['size']
  } & PrimitiveProps
>()

const emit = defineEmits<{
  (e: 'update:tabSelect', value: OptionItem<T>): void
}>()
</script>
