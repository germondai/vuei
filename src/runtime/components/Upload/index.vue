<template>
  <Primitive
    :as
    class="relative p-4 flex items-center justify-center rounded-lg bg-gray-200/20 hover:bg-gray-200/25 transition-colors shdw aspect-video cursor-pointer"
    @dragover.prevent="dragOver = true"
    @dragleave.prevent="dragOver = false"
    @drop.prevent="handleDrop"
    @click="openFilePicker"
  >
    <input
      ref="fileInput"
      type="file"
      class="hidden"
      :multiple
      :accept="acceptTypes?.join(',')"
      @change="handleFileSelect"
    />
    <div class="flex flex-col items-center justify-center gap-2">
      <Icon name="mdi:upload" class="min-w-16 size-16" />
      <CardDescription v-if="dropMessage || selectMessage">
        {{ dragOver ? dropMessage : selectMessage }}
      </CardDescription>
    </div>
  </Primitive>
</template>

<script setup lang="ts">
import type { MimeType } from '@uploadthing/mime-types'
import { shallowRef, useTemplateRef } from 'vue'
import { useFallbackModel } from '../../composables/useFallbackModel'
import type { PrimitiveProps, UploadError, UploadProps } from '../../types'
import CardDescription from '../Card/Description.vue'
import Primitive from '../Primitive/index.vue'

const {
  as,
  acceptTypes = [],
  maxSize = 5 * 1024 * 1024,
  maxFiles,
  multiple,
  dropMessage = 'Drop the file here...',
  selectMessage = 'Choose file or drag & drop',
  ...props
} = defineProps<{ modelValue?: File[] } & UploadProps & PrimitiveProps>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: File[]): void
  (e: 'error', value: UploadError): void
}>()

const files = useFallbackModel(props, 'modelValue', emit, {
  fallback: [],
  deep: true,
})

const fileInput = useTemplateRef('fileInput')
const dragOver = shallowRef<boolean>(false)

const openFilePicker = () => fileInput.value?.click()

const handleFileSelect = (event: Event) => {
  const input = event.target as HTMLInputElement
  if (input.files) addFiles(Array.from(input.files))
}

const handleDrop = (event: DragEvent) => {
  dragOver.value = false
  if (event.dataTransfer?.files) addFiles(Array.from(event.dataTransfer.files))
}

const addFiles = (selectedFiles: File[]) => {
  if (selectedFiles.length === 0)
    return emit('error', { title: 'No files selected' })
  if (maxFiles && files.value?.length + selectedFiles.length > maxFiles)
    return emit('error', { title: 'Too many files' })

  selectedFiles.forEach((file) => {
    if (file.size >= maxSize) return emit('error', { title: 'File too large' })
    if (acceptTypes.length > 0 && !acceptTypes.includes(file.type as MimeType))
      return emit('error', { title: 'File type not allowed' })

    if (!multiple) files.value = []

    files.value?.push(file)
  })
}
</script>
