import { useSearchScore } from './useSearchScore'
import type { SelectFields, useSearchOptions } from '../types'

export const useSearch = <T extends object>(
  objects: T[],
  searchQuery: string,
  fields: SelectFields<T>,
  options: useSearchOptions = {},
): T[] =>
  objects
    .map((option) => ({
      ...option,
      matchScore: useSearchScore(option, searchQuery, fields, options),
    }))
    .filter((option) => option.matchScore > 0)
    .sort((a, b) => b.matchScore - a.matchScore)
