<template>
  <Primitive v-bind="props">
    <span v-html="typeValue" />
    <span
      class="inline-block w-1 ml-1 bg-primary-50 animate-[cursorBlink_1s_infinite]"
      :class="{ 'animate-none': typeStatus }"
      >&nbsp;</span
    >
  </Primitive>
</template>

<script lang="ts" setup>
import { onMounted, onUnmounted, ref, watch } from 'vue'
import type { PrimitiveProps } from './../../module'
import Primitive from './Primitive/index.vue'

const {
  typeArray,
  typingSpeed = 200,
  erasingSpeed = 100,
  newTextDelay = 2000,
  ...props
} = defineProps<
  {
    typeArray: string[]
    typingSpeed?: number
    erasingSpeed?: number
    newTextDelay?: number
  } & PrimitiveProps
>()

const typeValue = ref<string>('')
const typeStatus = ref<boolean>(false)

let typeArrayIndex = 0
let charIndex = 0
let typingTimeout: ReturnType<typeof setTimeout>

const typeText = () => {
  if (charIndex < typeArray[typeArrayIndex]!.length) {
    typeStatus.value = true

    typeValue.value += typeArray[typeArrayIndex]!.charAt(charIndex)
    charIndex++

    typingTimeout = setTimeout(typeText, typingSpeed)
  } else {
    typeStatus.value = false
    typingTimeout = setTimeout(eraseText, newTextDelay)
  }
}

const eraseText = () => {
  if (charIndex > 0) {
    typeStatus.value = true

    typeValue.value = typeArray[typeArrayIndex]!.substring(0, charIndex - 1)
    charIndex--

    typingTimeout = setTimeout(eraseText, erasingSpeed)
  } else {
    typeStatus.value = false
    charIndex = 0
    typeArrayIndex = (typeArrayIndex + 1) % typeArray.length
    typingTimeout = setTimeout(typeText, typingSpeed + 1000)
  }
}

const resetTyping = () => {
  typeArrayIndex = 0
  charIndex = 0
  typeValue.value = ''
  clearTimeout(typingTimeout)
  typeText()
}

watch(() => typeArray, resetTyping, { deep: true })

onMounted(() => resetTyping())

onUnmounted(() => clearTimeout(typingTimeout))
</script>
