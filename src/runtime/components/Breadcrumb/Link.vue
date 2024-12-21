<template>
  <li
    class="flex items-center"
    :class="{ 'opacity-60 hover:opacity-80 transition-opacity': !solid }"
  >
    <component
      :is="solid ? 'span' : NuxtLink"
      v-bind="solid ? props : undefined"
      class="flex-1 truncate"
    >
      <slot />
    </component>
  </li>
</template>

<script lang="ts" setup>
import type { NuxtLinkProps } from '#app'
import { NuxtLink } from '#components'

const props = defineProps<NuxtLinkProps & { solid?: boolean }>()
</script>
