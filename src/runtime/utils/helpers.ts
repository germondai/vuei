export const getEffectiveZIndex = (el: HTMLElement): number => {
  while (el) {
    const zIndex = window.getComputedStyle(el).zIndex
    if (zIndex !== 'auto') return Number(zIndex)
    el = el.parentElement as HTMLElement
  }
  return 0
}
