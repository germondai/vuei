import { ref, unref } from 'vue'
import { z } from 'zod'

export const useValidateField = <T extends z.ZodType>(
  schema?: T,
  value?: T['_type'],
  { immediate }: { immediate?: boolean } = { immediate: false },
) => {
  const isValid = ref<boolean>(false)
  const errors = ref<string[]>([])

  const validate = () => {
    if (!schema || !(schema instanceof z.ZodType)) return

    try {
      schema.parse(unref(value))
      errors.value = []
      isValid.value = true
    } catch (err) {
      if (err instanceof z.ZodError)
        errors.value = err.errors.map((e) => e.message)
      isValid.value = false
    }
  }

  if (immediate) validate()

  return {
    isValid,
    errors,
    validate,
  }
}
