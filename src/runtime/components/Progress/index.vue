<template>
  <div
    class="w-full h-2 flex items-center rounded-xl bg-primary-400 overflow-hidden"
  >
    <div
      class="h-full bg-primary-700 transition-all duration-500"
      :style="{ width: `${value}%` }"
    />
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'

const { progress, keep = false } = defineProps<{
  progress: number
  keep?: boolean
}>()

const value = ref<number>(keep ? progress : 0)

onMounted(() => (value.value = progress))
</script>
