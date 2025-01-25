<template>
  <Primitive v-bind="props" :class="cn(baseClass)">
    <div
      class="relative max-w-sm group/ToastList w-full flex flex-col items-center sm:items-end gap-2 transition-all"
      @click="toasts.length > 3 && (show = true)"
    >
      <div
        v-if="show"
        class="flex items-center justify-end gap-2"
        :class="{ 'pointer-events-auto': show }"
      >
        <ToastButton icon="mdi:chevron-up" @click.stop="show = false">
          Show less
        </ToastButton>
        <ToastButton icon="mdi:close" @click.stop="clearToasts">
          Clear
        </ToastButton>
      </div>
      <template v-for="(toast, index) in toasts.toReversed()" :key="toast.id">
        <Toast
          v-if="show || index < 3"
          v-motion="{
            initial: { opacity: 0, x: 50 },
            visible: { x: 0, opacity: 1 },
          }"
          :style="{ zIndex: -index }"
          :class="
            cn('first:mt-0', {
              'mt-0': show,
              '-mt-16': toasts.length > 3 && !show,
            })
          "
          :toast
          :removeable
          @remove="removeToast"
        />
      </template>
      <ToastButton
        v-if="!removeable"
        class="group-hover/ToastList:opacity-100 opacity-0 absolute -top-2 -left-2 pointer-events-auto transition-all"
        icon="mdi:close"
        @click.stop="clearToasts"
      >
        Clear
      </ToastButton>
    </div>
  </Primitive>
</template>

<script lang="ts" setup>
import { computed, shallowRef, watchEffect } from 'vue'
import { useToast } from '../../composables/useToast'
import type { PrimitiveProps } from '../../types'
import { cn } from '../../utils/cn'
import Primitive from '../Primitive/index.vue'
import ToastButton from '../Toast/Button.vue'
import Toast from '../Toast/index.vue'

const baseClass =
  'fixed inset-0 p-2 sm:p-4 flex items-start justify-end pointer-events-none overflow-y-auto z-[9999]'

const { toasts, removeToast, clearToasts } = useToast()

const { ...props } = defineProps<{} & PrimitiveProps>()

const show = shallowRef<boolean>(false)

const removeable = computed(() => toasts.value.length <= 3 || show.value)

watchEffect(() => toasts.value.length < 3 && show.value && (show.value = false))
</script>
