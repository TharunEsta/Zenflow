 'use client'

import { useUserStore } from '@/lib/stores/useUserStore'
import { useProgressStore } from '@/lib/stores/useProgressStore'
import { dummyProfile } from '@/data/dummyUser'
import { useEffect } from 'react'

interface ProvidersProps {
  children: React.ReactNode
  // Add theme provider later
}

export function Providers({ children }: ProvidersProps) {
  return (
    <>
      {children}
      {/* ToastProvider commented to avoid build error - add react-hot-toast types if needed */}
      {/* <ToastProvider /> */}
    </>
  )
}
