import type { SelectFields } from '../types'

export const useSearchScore = <T extends object>(
  object: T,
  searchQuery: string,
  fields: SelectFields<T>,
): number => {
  const query = searchQuery.toLowerCase()

  return Math.max(
    ...Object.keys(fields).map((_fieldKey) => {
      const fieldKey = _fieldKey as keyof T
      const field = fields[fieldKey]
      if (field === undefined) return 0

      const fieldValue = object[fieldKey]
      if (typeof field === 'object' && field !== null)
        return useSearchScore(fieldValue, query, field)

      const fieldString = fieldValue ? String(fieldValue).toLowerCase() : ''
      const index = fieldString.indexOf(query)
      return index !== -1 ? 100 - index : 0
    }),
  )
}
