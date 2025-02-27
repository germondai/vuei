<template>
  <Primitive :as class="flex flex-col gap-2">
    <Upload
      v-model="files"
      :acceptTypes
      :maxSize
      :maxFiles
      :multiple
      @error="emit('error', $event)"
    />
    <ul v-if="files.length" class="flex flex-col gap-2">
      <UploadItem
        v-for="(file, index) in files"
        :key="index"
        :index
        :file
        @delete="handleDelete"
      />
    </ul>
  </Primitive>
</template>

<script lang="ts" setup>
import Upload from './index.vue'
import UploadItem from './Item.vue'
import { useFallbackModel } from '../../composables/useFallbackModel'
import type { PrimitiveProps, UploadError, UploadProps } from '../../types'
import Primitive from '../Primitive/index.vue'

const { as, acceptTypes, maxFiles, maxSize, multiple, ...props } = defineProps<
  { modelValue?: File[] } & UploadProps & PrimitiveProps
>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: File[]): void
  (e: 'error', value: UploadError): void
}>()

const files = useFallbackModel(props, 'modelValue', emit, {
  fallback: [],
  deep: true,
})

const handleDelete = (index: number) => files.value?.splice(index, 1)
</script>
