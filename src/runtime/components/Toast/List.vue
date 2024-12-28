<template>
  <Primitive v-bind="props" :class="cn(baseClass)">
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
  </Primitive>
</template>

<script lang="ts" setup>
import type { PrimitiveProps } from '../../../module'
import { useToast } from '../../composables/useToast'
import { cn } from '../../utils/helpers'
import Primitive from '../Primitive/index.vue'
import Toast from '../Toast/index.vue'

const baseClass =
  'fixed mt-16 sm:mt-14 inset-0 p-2 sm:p-4 flex items-start pointer-events-none z-50'

const { toasts, removeToast } = useToast()

const { ...props } = defineProps<{} & PrimitiveProps>()
</script>
