<template>
  <button
    class="group/button p-0.5 flex items-center rounded-full text-sm bg-primary-900/10 hover:bg-primary-900/20 backdrop-blur shdw"
  >
    <Icon
      v-if="icon"
      :name="icon"
      class="min-w-4 size-4 sm:min-w-5 sm:size-5"
    />
    <div
      class="w-0 group-hover/button:w-auto whitespace-nowrap overflow-hidden transition-all"
      :class="{
        'p-0 group-hover/button:pl-0.5 group-hover/button:pr-1': $slots.default,
      }"
    >
      <slot />
    </div>
  </button>
</template>

<script lang="ts" setup>
const { icon } = defineProps<{ icon?: string }>()
</script>
