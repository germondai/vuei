<template>
  <div class="flex flex-row gap-2 sm:gap-4 flex-wrap">
    <Button
      v-for="tab in tabs"
      :key="tab.id"
      :icon="tab.icon"
      :size
      :selected="selectedTab.id === tab.id"
      :type="selectedTab.id === tab.id ? 'main' : 'shadow'"
      class="justify-center max-sm:flex-grow"
      @click="emit('tabSelect', tab)"
    >
      {{ tab.name }}
    </Button>
  </div>
</template>

<script lang="ts" setup generic="T">
import type { ButtonProps, OptionItem } from '../../utils/types'
import Button from '../Button/index.vue'

const { selectedTab, tabs, size } = defineProps<{
  selectedTab: OptionItem<T>
  tabs: OptionItem<T>[]
  size?: ButtonProps['size']
}>()
const emit = defineEmits<{
  (e: 'tabSelect', value: OptionItem<T>): void
}>()
</script>
