export type Enumize<T extends string> = { [K in T]: K }

export type NotificationType =
  | 'INFO'
  | 'SUCCESS'
  | 'WARNING'
  | 'ERROR'
  | 'SYSTEM'

export const NotificationType: Enumize<NotificationType> = {
  INFO: 'INFO',
  SUCCESS: 'SUCCESS',
  WARNING: 'WARNING',
  ERROR: 'ERROR',
  SYSTEM: 'SYSTEM',
} as const

export interface Flare {
  color: string
  size: number
}
