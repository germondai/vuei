import {
  computed,
  getCurrentInstance,
  ref,
  shallowRef,
  unref,
  watch,
} from 'vue'

/**
 * A composable for creating a model with a fallback value. This is useful for managing reactive state
 * with props, ensuring a fallback value is used when a prop value is undefined or unavailable.
 *
 * You can also define your own model value logic by providing a fallback value or a function to compute it.
 *
 * @template P - The type of the props object.
 * @template K - The key in the props object to watch and manage.
 * @template Name - The name of the event to emit updates.
 *
 * @param {P} props - The props object passed to the component.
 * @param {K} [key] - The key in the props object to bind the model to. Defaults to 'modelValue'.
 * @param {(name: Name, ...args: any[]) => void} [emit] - The function to emit events, typically provided by Vue.
 * @param {object} [options] - Optional settings for the fallback model.
 * @param {boolean} [options.deep] - Whether to perform a deep watch on the fallback value.
 * @param {P[K] | ((value: P[K]) => P[K])} [options.fallback] - The fallback value or a function to compute it.
 * @param {(newValue: P[K], oldValue: P[K]) => void} [options.onUpdate] - A callback invoked when the model is updated.
 *
 * @returns A writable computed reference representing the model.
 *
 * @example
 * export interface DropdownItem {
 *   id: string
 *   name: string
 *   icon?: string
 * }
 *
 * const { items, required, collapsible, ...props } = defineProps<{
 *   selectedItem?: DropdownItem | null
 *   opened?: boolean
 *   items?: DropdownItem[]
 *   required?: boolean
 *   collapsible?: boolean
 * }>()
 *
 * const emit = defineEmits<{
 *   (e: 'update:opened', value: boolean): void
 *   (e: 'update:selectedItem', value: DropdownItem): void
 * }>()
 *
 * const opened = useFallbackModel(props, 'opened', emit)
 *
 * const emptyOption: DropdownItem = { id: '', name: 'Select an option' }
 *
 * const selectedItem = useFallbackModel(props, 'selectedItem', emit, {
 *   fallback: (val) => (required ? val || items[0] : val || emptyOption),
 *   onUpdate: (newVal) => collapsible && newVal && (opened.value = false),
 * })
 */
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
    fallback?: P[K] | ((value: P[K]) => P[K])
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
      ? (fallback as (value: P[K]) => P[K])(props[key])
      : fallback || props[key],
  )

  const fallbackRef = deep
    ? ref<P[K]>(resolvedFallback.value)
    : shallowRef<P[K]>(resolvedFallback.value)

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
