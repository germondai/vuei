export const truncate = (
  text: string,
  maxLength: number,
  ellipsis: boolean = false,
): string => {
  if (text.length <= maxLength) return text

  if (ellipsis) return text.slice(0, maxLength - 3) + '...'

  return text.slice(0, maxLength)
}

export const isSameDay = (d1: Date, d2: Date) => {
  return (
    d1.getDate() === d2.getDate() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getFullYear() === d2.getFullYear()
  )
}

export const isInSameMonth = (d1: Date, d2: Date) => {
  return (
    d1.getMonth() === d2.getMonth() && d1.getFullYear() === d2.getFullYear()
  )
}
