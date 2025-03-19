<template>
  <Dialog>
    <DialogTrigger
      :disabled="
        !(
          isSupportedDisplayableMedia(file.type, { image: true }) ||
          isSupportedDisplayableMedia(file.type, { video: true })
        )
      "
      as="li"
      class="p-2 flex items-center gap-2 rounded-lg bg-gray-200/20 hover:bg-gray-200/25 transition-colors shdw"
    >
      <img
        v-if="isSupportedDisplayableMedia(file.type, { image: true })"
        :src="previewImage(file)"
        class="min-w-12 size-12 rounded-lg object-cover"
      />
      <Icon
        v-else-if="isSupportedDisplayableMedia(file.type, { video: true })"
        name="mdi:video"
        class="min-w-12 size-12"
      />
      <Icon v-else name="mdi:file" class="min-w-12 size-12" />
      <span
        class="w-full flex items-center justify-between gap-2 text-primary-300"
      >
        <span>{{ file.name }}</span>
        <span>({{ formatBytes(file.size) }})</span>
      </span>
      <Button
        icon="mdi:close"
        variant="destructive"
        size="icon"
        type="button"
        class="justify-center"
        @click.stop="emit('delete', index)"
      />
    </DialogTrigger>
    <DialogContent asChild>
      <Container
        asChild
        mode="max"
        size="lg"
        class="w-full flex items-center justify-center bg-primary-950"
      >
        <img
          v-if="isSupportedDisplayableMedia(file.type, { image: true })"
          :src="previewImage(file)"
        />
        <video
          v-else-if="isSupportedDisplayableMedia(file.type, { video: true })"
          :src="previewImage(file)"
          controls
        />
      </Container>
    </DialogContent>
  </Dialog>
</template>

<script lang="ts" setup>
import { formatBytes, isSupportedDisplayableMedia } from '@germondai/ts-utils'
import Button from '../Button/index.vue'
import Container from '../Container/index.vue'
import DialogContent from '../Dialog/Content.vue'
import Dialog from '../Dialog/index.vue'
import DialogTrigger from '../Dialog/Trigger.vue'

const { index, file } = defineProps<{ index: number; file: File }>()

const emit = defineEmits<{ (e: 'delete', value: number): void }>()

const previewImage = (file: File) => URL.createObjectURL(file)
</script>
