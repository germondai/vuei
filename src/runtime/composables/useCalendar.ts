import { type ComputedRef, type Ref, computed, ref } from 'vue'
import { isSameDay } from '../utils/helpers'

export interface UseCalendarReturn {
  today: Ref<Date>
  day: ComputedRef<number>
  month: ComputedRef<number>
  year: ComputedRef<number>
  modifyDay: (daysToAdd: number) => Date
  modifyMonth: (monthsToAdd: number) => Date
  modifyYear: (yearsToAdd: number) => Date
  getLocalizedDayNames: (
    weekday?: Intl.DateTimeFormatOptions['weekday'],
  ) => string[]
  getLocalizedMonthNames: (
    monthFormat?: Intl.DateTimeFormatOptions['month'],
  ) => string[]
  monthDays: ComputedRef<Date[]>
  weekDays: ComputedRef<number[]>
  selectedDays: Ref<Date[]>
  handleSelect: (e: MouseEvent, selectedDay: Date) => Date[]
}

export const useCalendar = ({
  date = new Date(),
  locale = navigator?.language || 'en-US',
}: {
  date?: Date
  locale?: string
}): UseCalendarReturn => {
  const today = ref<Date>(date)
  const day = computed<number>(() => today.value.getDate())
  const month = computed<number>(() => today.value.getMonth())
  const year = computed<number>(() => today.value.getFullYear())

  const modifyDay = (daysToAdd: number): Date =>
    (today.value = new Date(
      today.value.setDate(today.value.getDate() + daysToAdd),
    ))

  const modifyMonth = (monthsToAdd: number): Date =>
    (today.value = new Date(
      today.value.setMonth(today.value.getMonth() + monthsToAdd),
    ))

  const modifyYear = (yearsToAdd: number): Date =>
    (today.value = new Date(
      today.value.setFullYear(today.value.getFullYear() + yearsToAdd),
    ))

  const getLocalizedDayNames = (
    weekday: Intl.DateTimeFormatOptions['weekday'] = 'long',
  ): string[] => {
    const daysOfWeek: string[] = []

    for (let i = 1; i <= 7; i++) {
      const baseDate = new Date(1970, 0, i + 4)
      const dayName = baseDate.toLocaleDateString(locale, { weekday })
      daysOfWeek.push(dayName)
    }

    return daysOfWeek
  }

  const getLocalizedMonthNames = (
    monthFormat: Intl.DateTimeFormatOptions['month'] = 'long',
  ): string[] => {
    const months: string[] = []

    for (let i = 0; i < 12; i++) {
      const baseDate = new Date(1970, i)
      const monthName = baseDate.toLocaleDateString(locale, {
        month: monthFormat,
      })
      months.push(monthName)
    }

    return months
  }

  const monthDays = computed((): Date[] => {
    const days: Date[] = []

    const prevMonthDays = new Date(year.value, month.value, 0).getDate()
    const firstDay = new Date(year.value, month.value, 1).getDay() || 7
    const daysInMonth = new Date(year.value, month.value + 1, 0).getDate()

    // days of prev month (if curr month doesnt start on Monday)
    for (let i = firstDay - 1; i > 0; i--)
      days.push(new Date(year.value, month.value - 1, prevMonthDays - i + 1))

    // days of curr month
    for (let day = 1; day <= daysInMonth; day++)
      days.push(new Date(year.value, month.value, day))

    // days of next month to fill up to 6 weeks
    for (let day = 1; days.length < 7 * 6; day++)
      days.push(new Date(year.value, month.value + 1, day))

    return days
  })

  const weekDays = computed((): number[] => {
    const today = new Date(year.value, month.value, day.value)
    const dayOfWeek = today.getDay() || 7
    const monday = new Date(today)
    monday.setDate(today.getDate() - dayOfWeek + 1)

    return Array.from({ length: 7 }, (_, i) => {
      const day = new Date(monday)
      day.setDate(monday.getDate() + i)
      return day.getDate()
    })
  })

  const selectedDays = ref<Date[]>([])

  const handleSelect = (e: MouseEvent, selectedDay: Date): Date[] => {
    const { ctrlKey, metaKey, shiftKey } = e

    // select default day
    if (!(ctrlKey || metaKey || shiftKey)) {
      selectedDays.value =
        selectedDays.value.includes(selectedDay) &&
        selectedDays.value.length < 2
          ? []
          : [selectedDay]
    }

    if (ctrlKey || metaKey) {
      // remove specific day
      if (selectedDays.value.includes(selectedDay)) {
        const index = selectedDays.value.findIndex((d) => d === selectedDay)
        return selectedDays.value.splice(index, 1)
      }

      // select specific day
      return (selectedDays.value = [...selectedDays.value, selectedDay])
    }

    // select days from to
    if (shiftKey) {
      const latest = selectedDays.value[selectedDays.value.length - 1]!

      let save = false
      for (const day of latest > selectedDay
        ? [...monthDays.value].reverse()
        : monthDays.value) {
        if (isSameDay(day, latest)) save = true
        if (!save) continue
        if (isSameDay(day, selectedDay)) save = false

        if (!selectedDays.value.includes(day)) selectedDays.value.push(day)

        if (!save) break
      }
    }

    return selectedDays.value
  }

  return {
    getLocalizedDayNames,
    getLocalizedMonthNames,
    today,
    day,
    month,
    year,
    modifyDay,
    modifyMonth,
    modifyYear,
    monthDays,
    weekDays,
    handleSelect,
    selectedDays,
  }
}
