import { useSearchScore } from './useSearchScore'
import type { SelectFields } from '../types'

export const useSearch = <T extends object>(
  objects: T[],
  searchQuery: string,
  fields: SelectFields<T>,
): T[] =>
  objects
    .map((option) => ({
      ...option,
      matchScore: useSearchScore(option, searchQuery, fields),
    }))
    .filter((option) => option.matchScore > 0)
    .sort((a, b) => b.matchScore - a.matchScore)
