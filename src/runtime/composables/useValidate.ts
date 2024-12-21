import { type MaybeRef, ref, toRef } from 'vue'
import { Schema, ValidationError } from 'yup'

export const useValidate = () => {
  const validateField = (
    schema: object | undefined,
    value: MaybeRef<unknown>,
    { immediate }: { immediate?: boolean } = { immediate: false },
  ) => {
    const val = toRef(value)
    const isValid = ref<boolean>(false)
    const errors = ref<string[]>([])
    const specs = ref<Schema['spec'] | undefined>(
      schema instanceof Schema ? schema.spec : undefined,
    )

    const validate = async () => {
      if (!schema) return
      if (!(schema instanceof Schema)) return

      try {
        await schema.validate(val.value, { abortEarly: false })
        errors.value = []
      } catch (err) {
        if (err instanceof ValidationError) {
          errors.value = err.errors
        } else console.error(err)
      }

      isValid.value = await schema.isValid(val.value)
    }

    if (immediate) validate()

    return {
      isValid,
      errors,
      specs,
      validate,
    }
  }

  return { validateField }
}
