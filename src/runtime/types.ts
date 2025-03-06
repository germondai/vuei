import type { MimeType } from '@uploadthing/mime-types'
import type { Component } from 'vue'

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

export type ButtonSizes = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'icon'
export type ButtonVariants =
  | 'primary'
  | 'secondary'
  | 'destructive'
  | 'outline'
  | 'ghost'
  | 'link'
export type ButtonIconPosition = 'left' | 'right'

export interface ButtonProps {
  tag?: Element['tagName']
  variant?: ButtonVariants
  size?: ButtonSizes
  icon?: string
  iconPosition?: ButtonIconPosition
  selected?: boolean
  disabled?: boolean
  type?: HTMLButtonElement['type']
}

export interface OptionItem<T = unknown> {
  id: string
  name: string
  icon?: string
  data?: T
}

interface FlareOpts {
  color?: string
  size?: number
}

export type Flare = FlareOpts | false

export type HTMLTag =
  | 'a'
  | 'abbr'
  | 'address'
  | 'area'
  | 'article'
  | 'aside'
  | 'audio'
  | 'b'
  | 'base'
  | 'bdi'
  | 'bdo'
  | 'blockquote'
  | 'body'
  | 'br'
  | 'button'
  | 'canvas'
  | 'caption'
  | 'cite'
  | 'code'
  | 'col'
  | 'colgroup'
  | 'data'
  | 'datalist'
  | 'dd'
  | 'del'
  | 'details'
  | 'dfn'
  | 'dialog'
  | 'div'
  | 'dl'
  | 'dt'
  | 'em'
  | 'embed'
  | 'fieldset'
  | 'figcaption'
  | 'figure'
  | 'footer'
  | 'form'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'head'
  | 'header'
  | 'hgroup'
  | 'hr'
  | 'html'
  | 'i'
  | 'iframe'
  | 'img'
  | 'input'
  | 'ins'
  | 'kbd'
  | 'label'
  | 'legend'
  | 'li'
  | 'link'
  | 'main'
  | 'map'
  | 'mark'
  | 'menu'
  | 'meta'
  | 'meter'
  | 'nav'
  | 'noscript'
  | 'object'
  | 'ol'
  | 'optgroup'
  | 'option'
  | 'output'
  | 'p'
  | 'picture'
  | 'pre'
  | 'progress'
  | 'q'
  | 'rp'
  | 'rt'
  | 'ruby'
  | 's'
  | 'samp'
  | 'script'
  | 'search'
  | 'section'
  | 'select'
  | 'slot'
  | 'small'
  | 'source'
  | 'span'
  | 'strong'
  | 'style'
  | 'sub'
  | 'summary'
  | 'sup'
  | 'table'
  | 'tbody'
  | 'td'
  | 'template'
  | 'textarea'
  | 'tfoot'
  | 'th'
  | 'thead'
  | 'time'
  | 'title'
  | 'tr'
  | 'track'
  | 'u'
  | 'ul'
  | 'var'
  | 'video'
  | 'wbr'
  | ({} & HTMLElement['tagName'])

export interface PrimitiveProps {
  as?: HTMLTag | Component
  asChild?: boolean
}

export interface TriggerProps {
  disabled?: boolean
}

export type SelectFields<T> =
  T extends Array<infer U>
    ? SelectFields<U>
    : T extends object
      ? { [K in keyof T]?: SelectFields<T[K]> }
      : boolean

export type useSearchOptions = {
  caseSensitive?: boolean
}

export interface Icon {
  name: string
  color?: string
}

export interface Toast {
  id: string
  title: string
  message?: string
  type?: NotificationType
  duration?: number
  icon?: Icon
}

export type Tag = { name: string } | string

export type UploadProps = {
  multiple?: boolean
  maxSize?: number
  maxFiles?: number
  dropMessage?: string
  selectMessage?: string
  acceptTypes?: MimeType[]
}

export type UploadError = Omit<Toast, 'id'>
