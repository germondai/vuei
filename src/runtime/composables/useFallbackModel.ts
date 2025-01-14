import { computed, getCurrentInstance, shallowRef, unref, watch } from 'vue'

type FallbackFn<P extends object, K extends keyof P> = (value: P[K]) => P[K]

export const useFallbackModel = <
  P extends object,
  K extends keyof P,
  Name extends string,
>(
  props: P,
  key?: K,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  emit?: (name: Name, ...args: any[]) => void,
  options: {
    deep?: boolean
    fallback?: P[K] | FallbackFn<P, K>
    onUpdate?: (newValue: P[K], oldValue: P[K]) => void
  } = {},
) => {
  const { deep, fallback, onUpdate } = options

  const vm = getCurrentInstance()
  const _emit =
    // @ts-expect-error mis-alignment with @vue/composition-api
    emit || vm?.emit || vm?.$emit?.bind(vm) || vm?.proxy?.$emit?.bind(vm?.proxy)

  if (!key) key = 'modelValue' as K
  const event = `update:${key.toString()}`

  const resolvedFallback = computed(() =>
    fallback !== undefined && typeof fallback === 'function'
      ? (fallback as FallbackFn<P, K>)(props[key])
      : fallback || props[key],
  )

  const fallbackRef = shallowRef<P[K]>(resolvedFallback.value)

  const model = computed({
    get: () => unref(fallbackRef),
    set: (newValue: P[K]) => {
      const oldValue = unref(fallbackRef)
      _emit(event, newValue)
      fallbackRef.value = newValue
      onUpdate?.(newValue, oldValue)
    },
  })

  watch(resolvedFallback, (v) => (model.value = v), { deep })

  return model
}
