"use client"

import { toast, Toaster } from 'sonner'

export const notify = (
  message: string,
  type: 'success' | 'error' | 'default' = 'default'
) => {
  if (type === 'success') {
    toast.success(message)
  } else if (type === 'error') {
    toast.error(message)
  } else {
    toast(message)
  }
}

export function ToastProvider() {
  return <Toaster position="top-right" richColors />
}

