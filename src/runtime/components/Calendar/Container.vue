<template>
  <div class="flex flex-col">
    <div class="flex items-center justify-between gap-4">
      <div class="flex items-center gap-2">
        <Icon name="mdi:calendar-month-outline" class="mx-4 min-w-10 size-10" />
        <div class="flex flex-col items-start leading-snug">
          <b>
            {{ today.toLocaleDateString(locale, { month: 'long' }) }}
          </b>
          <p class="text-sm opacity-60">{{ year }}</p>
        </div>
      </div>
      <div class="flex items-center gap-2">
        <Button
          variant="outline"
          size="icon"
          icon="mdi:chevron-left"
          @click="modifyMonth(-1)"
        />
        <Button
          variant="outline"
          size="icon"
          icon="mdi:chevron-right"
          @click="modifyMonth(1)"
        />
      </div>
    </div>
    <div class="h-px w-full my-4 shdw"></div>
    <div class="grid grid-cols-7 gap-1">
      <div
        v-for="name in getLocalizedDayNames()"
        :key="name"
        class="flex items-center justify-center"
      >
        {{ truncate(name, 2) }}
      </div>
      <CalendarCell
        v-for="(day, key) in monthDays"
        :key
        :day
        :calendarDay="today"
        :selectedDays="selectedDays"
        :handleSelect="handleSelect"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { watchEffect } from 'vue'
import { useCalendar } from '../../composables/useCalendar'
import { truncate } from '../../utils/helpers'

const locale = navigator?.language || 'cs-CZ'

const {
  today,
  year,
  monthDays,
  modifyMonth,
  handleSelect,
  selectedDays,
  getLocalizedDayNames,
} = useCalendar({ locale })

const emit = defineEmits<{ (e: 'select', value: Date[]): void }>()

watchEffect(() => emit('select', selectedDays.value))
</script>
