// inspired by: https://github.com/unovue/radix-vue/blob/main/packages/radix-vue/src/shared/createContext.ts

import { type InjectionKey, inject, provide } from 'vue'

/**
 * @param providerComponentName - The name(s) of the component(s) providing the context.
 *
 * There are situations where context can come from multiple components. In such cases, you might need to give an array of component names to provide your context, instead of just a single string.
 *
 * @param contextName The description for injection key symbol.
 */
export function createContext<ContextValue>(
  providerComponentName: string | string[],
  contextName?: string,
) {
  const symbolDescription =
    typeof providerComponentName === 'string' && !contextName
      ? `${providerComponentName}Context`
      : contextName

  const injectionKey: InjectionKey<ContextValue | null> =
    Symbol(symbolDescription)

  type injectContextReturn<T extends Partial<ContextValue>> = {
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
   *
   * @throws When context injection failed and no fallback is specified.
   * This happens when the component injecting the context is not a child of the root component providing the context.
   */
  const injectContext = <T extends Partial<ContextValue>>(
    fallback?: T,
  ): injectContextReturn<T> => {
    const context = inject(injectionKey, { ...fallback } as ContextValue)
    return { ...fallback, ...context } as injectContextReturn<T>
  }

  const provideContext = (contextValue: ContextValue): ContextValue => {
    provide(injectionKey, contextValue)
    return contextValue
  }

  return [injectContext, provideContext] as const
}
