<template>
  <div
    class="fixed mt-16 sm:mt-14 inset-0 p-2 sm:p-4 flex items-start pointer-events-none z-50"
  >
    <div class="w-full flex flex-col items-center sm:items-end gap-2">
      <TransitionGroup name="groupFade">
        <Toast
          v-for="toast in toasts"
          :key="toast.id"
          :toast="toast"
          @remove="removeToast"
        />
      </TransitionGroup>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useToast } from '../../composables/useToast'
import Toast from '../Toast/index.vue'

const { toasts, removeToast } = useToast()
</script>
