// inspired by: https://github.com/unovue/radix-vue/blob/main/packages/radix-vue/src/shared/createContext.ts

import { type InjectionKey, inject, provide } from 'vue'

/**
 * @param providerComponentName - The name(s) of the component(s) providing the context.
 *
 * There are situations where context can come from multiple components. In such cases, you might need to give an array of component names to provide your context, instead of just a single string.
 *
 * @param contextName The description for injection key symbol.
 */
export function createContext<ContextValue extends object>(
  providerComponentName: string | string[],
  contextName?: string,
) {
  const symbolDescription =
    typeof providerComponentName === 'string' && !contextName
      ? `${providerComponentName}Context`
      : contextName

  const injectionKey: InjectionKey<ContextValue | null> =
    Symbol(symbolDescription)

  type InjectContextReturn<T extends Partial<ContextValue>> = {
    [K in keyof ContextValue]: K extends keyof T
      ? T[K] extends Exclude<ContextValue[K], undefined>
        ? T[K] extends Exclude<ContextValue[K], null | undefined>
          ? Exclude<ContextValue[K], null | undefined>
          : Exclude<ContextValue[K], undefined>
        : ContextValue[K] | undefined
      : ContextValue[K] | undefined
  }

  /**
   * @param fallback The context value to return if the injection fails.
   */
  const injectContext = <T extends Partial<ContextValue>>(
    fallback?: T,
  ): InjectContextReturn<T> => {
    const context = inject(injectionKey, { ...fallback } as ContextValue)
    return context as InjectContextReturn<T>
  }

  const provideContext = (contextValue: ContextValue): ContextValue => {
    provide(injectionKey, contextValue)
    return contextValue
  }

  return [injectContext, provideContext] as const
}
