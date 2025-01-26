<template>
  <Primitive :as :asChild :class="cn(baseClass)">
    <template v-if="edit">
      <TagItem
        v-for="(_, key) in tags.length > 0 ? tags : ['']"
        ref="tagRefs"
        :key
        v-model="tags[key]"
        :edit
        @keyup.enter="addTag"
        @keyup.backspace="(e) => removeTag(e, key)"
        @focusout="emit('update')"
      />
      <TagItem
        as="button"
        type="button"
        modelValue="+"
        @click.prevent="addTag"
      />
    </template>
    <template v-else>
      <TagItem v-for="(tag, key) in tags" :key :modelValue="tag" />
    </template>
  </Primitive>
</template>

<script lang="ts" setup>
import { useFocus } from '@vueuse/core'
import { nextTick, ref } from 'vue'
import TagItem from './Item.vue'
import { useFallbackModel } from '../../composables/useFallbackModel'
import type { PrimitiveProps, Tag } from '../../types'
import { cn } from '../../utils/cn'
import Primitive from '../Primitive/index.vue'

const baseClass = 'flex items-center gap-2 flex-wrap'

const { as, asChild, edit, ...props } = defineProps<
  {
    tags?: Tag[]
    edit?: boolean
  } & PrimitiveProps
>()

const emit = defineEmits<{
  (e: 'update:tags', tags: Tag[]): void
  (e: 'update'): void
}>()

const tags = useFallbackModel(props, 'tags', emit, {
  fallback: () => [],
  deep: true,
})

const tagRefs = ref<HTMLElement[]>([])

const focusLastTag = async () => {
  await nextTick()
  const lastTag = tagRefs.value[tagRefs.value.length - 1]
  if (lastTag) useFocus(lastTag).focused.value = true
}

const addTag = () => {
  if (tags.value[tags.value.length - 1]) tags.value.push('')
  focusLastTag()
}

const removeTag = (event: KeyboardEvent, index: number) => {
  const input = event.target as HTMLInputElement
  if (input.value === '') {
    tags.value.splice(index, 1)
    focusLastTag()
  }
}
</script>
