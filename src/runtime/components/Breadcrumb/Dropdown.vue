<template>
  <Popover class="flex items-center justify-center">
    <PopoverTrigger
      class="h-6 flex items-center justify-between gap-0.5 opacity-60 hover:opacity-80 transition-opacity"
    >
      <span v-for="key in 3" :key class="size-1 bg-primary-50 rounded-full" />
    </PopoverTrigger>
    <PopoverContent
      :is="'ul'"
      class="w-48 p-2 rounded-lg bg-primary-900/5 backdrop-blur shdw"
    >
      <slot />
    </PopoverContent>
  </Popover>
</template>

<script lang="ts" setup>
import PopoverContent from '../Popover/Content.vue'
import Popover from '../Popover/index.vue'
import PopoverTrigger from '../Popover/Trigger.vue'
</script>
