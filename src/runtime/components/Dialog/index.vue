<template>
  <slot />
</template>

<script lang="ts" setup>
import { onClickOutside, unrefElement } from '@vueuse/core'
import type { ComputedRef, MaybeRef, Ref } from 'vue'
import {
  computed,
  inject,
  isRef,
  onUnmounted,
  provide,
  ref,
  useId,
  watch,
} from 'vue'
import { getEffectiveZIndex } from '../../utils/helpers'

const id = useId()

const trigger = ref<HTMLElement>()
const content = ref<HTMLElement>()

const parentIsOpen = inject<Ref<boolean> | null>('dialogState', null)
const parentNest = inject<boolean | null>('dialogNest', null)

const {
  isOpen: isO,
  nest,
  required,
} = defineProps<{
  isOpen?: MaybeRef<boolean>
  nest?: boolean
  required?: boolean
}>()
const emit = defineEmits<{ (e: 'update:isOpen', value: boolean): void }>()

const fallbackIsOpen = ref<boolean>(false)
const isOpen = computed({
  get: () => isO || fallbackIsOpen.value,
  set: (value: boolean) => {
    if (isO !== undefined && isRef(isO)) emit('update:isOpen', value)
    else fallbackIsOpen.value = value

    if (isClose.value === false && parentIsOpen)
      parentIsOpen.value =
        !parentNest && value && parentIsOpen.value ? false : true
  },
})

type dialogStates = Ref<({ id: string; isOpen: boolean } | null | undefined)[]>

const states = inject<dialogStates>('dialogStates', ref([]))
states.value = !states.value.some((state) => state?.id === id)
  ? [...states.value, { id, isOpen: isOpen as unknown as boolean }]
  : states.value

const childIsOpen = computed(() => {
  const currentIndex = states.value.findIndex((state) => state?.id === id)

  return states.value
    .filter((_, index) => index >= currentIndex)
    .some((state) => state?.isOpen === true)
})

onUnmounted(
  () => (states.value = states.value.filter((state) => state?.id !== id)),
)

provide<ComputedRef<boolean>>('dialogChildState', childIsOpen)
provide<dialogStates>('dialogStates', states)

const isClose = ref<boolean>(false)

const open = () => {
  isClose.value = true
  isOpen.value = true
  isClose.value = false
}
const close = () => (isOpen.value = false)
const toggle = () => (isOpen.value = !isOpen.value)
const closeAll = async () => {
  isClose.value = true
  isOpen.value = false
  isClose.value = false
}

onClickOutside(
  content,
  (event) => {
    if (required) return

    if (!isOpen.value && parentIsOpen && !parentIsOpen.value) return

    const clickedEl = event.target as HTMLElement | null
    const contentEl = unrefElement(content)

    if (!contentEl || !clickedEl) return

    const contentZIndex = getEffectiveZIndex(contentEl)
    const clickedZIndex = getEffectiveZIndex(clickedEl)

    if (clickedZIndex > contentZIndex) return

    isOpen.value = false
  },
  { ignore: [trigger] },
)

watch(isOpen, () => {
  if (!isClose.value && !nest && !isOpen.value && parentIsOpen?.value)
    parentIsOpen.value = true
})

defineExpose({ open, close, toggle, closeAll })

provide('dialogTrigger', trigger)
provide('dialogContent', content)
provide('dialogState', isOpen)
provide('dialogIsClose', isClose)
provide('dialogNest', nest)
</script>
