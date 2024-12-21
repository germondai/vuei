export type Screen =
  | '3xs'
  | '2xs'
  | 'xs'
  | 'sm'
  | 'md'
  | 'lg'
  | 'xl'
  | '2xl'
  | '3xl'

export type ColorShade =
  | 50
  | 100
  | 200
  | 300
  | 400
  | 500
  | 600
  | 700
  | 800
  | 900
  | 950

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

export interface ButtonProps {
  tag?: Element['tagName']
  type?: 'main' | 'shadow'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  icon?: string
  iconPosition?: 'left' | 'right'
  selected?: boolean
}

export interface OptionItem<T = unknown> {
  id: string
  name: string
  icon?: string
  data?: T
}

export interface Flare {
  color: string
  size: number
}
