import { readonly } from 'vue'
import type { Icon, NotificationType, Toast } from '../types'
import { useState } from '#app'

const ToastIcon: { [K in NotificationType]: Icon } = {
  INFO: { name: 'mdi:information', color: '#2196F3' },
  SUCCESS: { name: 'mdi:check-circle', color: '#4CAF50' },
  WARNING: { name: 'mdi:alert-circle', color: '#FFC107' },
  ERROR: { name: 'mdi:close-circle', color: '#F44336' },
  SYSTEM: { name: 'mdi:information', color: '#9E9E9E' },
}

export const useToast = () => {
  const toasts = useState<Toast[]>('toasts', () => [])

  const removeToast = (id: string) => {
    const toastIndex = toasts.value.findIndex((n) => n.id === id)
    toasts.value.splice(toastIndex, 1)
  }

  const addToast = (toast: Omit<Toast, 'id'>) => {
    const id =
      Math.random().toString(36).substr(2, 9) +
      new Date().getTime().toString(36)

    const type = toast.type || 'INFO'
    const icon = toast.icon || ToastIcon[type]
    const duration = toast.duration || 5000

    toasts.value.push({ ...toast, id, type, icon, duration })

    if (duration !== 0)
      setTimeout(() => {
        removeToast(id)
      }, duration)
  }

  return {
    toasts: readonly(toasts),
    removeToast,
    addToast,
  }
}
