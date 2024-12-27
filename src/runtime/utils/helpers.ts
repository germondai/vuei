import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs))

export const getEffectiveZIndex = (el: HTMLElement): number => {
  while (el) {
    const zIndex = window.getComputedStyle(el).zIndex
    if (zIndex !== 'auto') return Number(zIndex)
    el = el.parentElement as HTMLElement
  }
  return 0
}

export const getMatchScore = <T>(
  object: T,
  searchQuery: string,
  fields: (keyof T)[],
): number =>
  Math.max(
    ...fields.map((field) => {
      const fieldValue = object[field]
      const fieldString = fieldValue ? String(fieldValue).toLowerCase() : ''
      const index = fieldString.indexOf(searchQuery.toLowerCase())
      return index !== -1 ? 100 - index : 0
    }),
  )

export const searchObjectByFieldValues = <T>(
  objects: T[],
  searchQuery: string,
  fields: (keyof T)[],
): T[] =>
  objects
    .map((option) => ({
      ...option,
      matchScore: getMatchScore(option, searchQuery, fields),
    }))
    .filter((option) => option.matchScore > 0)
    .sort((a, b) => b.matchScore - a.matchScore)
