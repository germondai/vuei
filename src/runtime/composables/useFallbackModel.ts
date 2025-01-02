import { computed, getCurrentInstance, ref, unref, watch } from 'vue'

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

  const fb = computed(() =>
    fallback !== undefined && typeof fallback === 'function'
      ? (fallback as FallbackFn<P, K>)(props[key])
      : fallback || props[key],
  )

  const fallbackValue = ref<P[K]>(fb.value)

  watch(fb, (v) => (fallbackValue.value = v), { deep })

  return computed({
    get: () => unref(fallbackValue),
    set: (v: P[K]) => {
      _emit(event, v)
      fallbackValue.value = v
      if (onUpdate) onUpdate(v, fallbackValue.value)
    },
  })
}
