<template>
  <div
    class="h-full aspect-square flex items-center justify-center rounded-full leading-none cursor-pointer hover:bg-gray-200/20 transition-colors select-none"
    :class="{
      'border-2 border-blue-500': selectedDays.some((d) => isSameDay(d, day)),
      'bg-green-500/20': isSameDay(day, new Date()),
      'opacity-40': !isInSameMonth(day, calendarDay),
    }"
    @click="(e) => handleSelect(e, day)"
  >
    {{ day.getDate() }}
  </div>
</template>

<script lang="ts" setup>
import type { UseCalendarReturn } from '~/composables/useCalendar'

const { day, selectedDays, handleSelect } = defineProps<{
  day: Date
  selectedDays: UseCalendarReturn['selectedDays']['value']
  calendarDay: UseCalendarReturn['today']['value']
  handleSelect: UseCalendarReturn['handleSelect']
}>()
</script>
