import type { SelectFields, useSearchOptions } from '../types'

export const useSearchScore = <T>(
  value: T,
  searchQuery: string,
  fieldSpec: SelectFields<T>,
  options: useSearchOptions = {},
): number => {
  const { caseSensitive = false } = options

  const query = caseSensitive ? searchQuery : searchQuery.toLowerCase()
  const processString = (str: unknown) =>
    str != null ? (caseSensitive ? String(str) : String(str).toLowerCase()) : ''

  if (fieldSpec === true) {
    const valueString = processString(value)
    const index = valueString.indexOf(query)
    return index === -1
      ? 0
      : calculateScore(index, valueString.length, query.length)
  }

  if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
    if (typeof fieldSpec !== 'object' || fieldSpec === null) return 0
    let maxScore = 0
    const entries = Object.entries(fieldSpec) as [
      keyof T,
      SelectFields<T[keyof T]> | undefined,
    ][]
    for (const [key, subFieldSpec] of entries) {
      if (!(subFieldSpec === undefined || !(key in value))) {
        const subValue = value[key]
        const score = useSearchScore(subValue, query, subFieldSpec, {
          caseSensitive,
        })
        maxScore = Math.max(maxScore, score)
      }
    }
    return maxScore
  }

  if (Array.isArray(value)) {
    if (fieldSpec === true) {
      return Math.max(
        ...value.map((element) => {
          const elementString = processString(element)
          const index = elementString.indexOf(query)
          return index === -1
            ? 0
            : calculateScore(index, elementString.length, query.length)
        }),
      )
    }
    if (typeof fieldSpec !== 'object' || fieldSpec === null) return 0
    return Math.max(
      ...value.map((element) =>
        typeof element === 'object' && element !== null
          ? useSearchScore(element, query, fieldSpec, { caseSensitive })
          : 0,
      ),
    )
  }

  return 0
}

const calculateScore = (
  index: number,
  valueLength: number,
  queryLength: number,
): number => {
  const positionScore = 100 - Math.min(index, 99)
  const lengthRatio = queryLength / valueLength
  const matchBoost =
    valueLength === queryLength ? 20 : Math.min(lengthRatio * 20, 10)
  return Math.round(positionScore + matchBoost)
}
