"use client"

import { Button } from '@/components/ui/button'
import { useUserStore } from '@/lib/stores/useUserStore'
import { useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'

export default function Splash() {
  const router = useRouter()
  const { isAuthenticated, isOnboarded, reset } = useUserStore()

  const checkAuthAndRedirect = useCallback(() => {
    if (isAuthenticated && isOnboarded) {
      router.replace('/dashboard')
    } else if (isAuthenticated) {
      router.replace('/onboarding')
    }
  }, [isAuthenticated, isOnboarded, router])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      checkAuthAndRedirect()
    }
  }, [checkAuthAndRedirect])

  const handleGetStarted = () => {
    router.push('/onboarding')
  }

  const handleReset = () => {
    localStorage.clear()
    window.location.reload()
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-green-50 to-emerald-100 flex flex-col items-center justify-center px-6 text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-2xl"
      >
        <motion.div
          initial={{ rotate: -10, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mb-6"
        >
          <div className="text-7xl animate-pulse">🪷</div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-5xl md:text-7xl font-extrabold bg-gradient-to-r from-green-500 via-emerald-400 to-green-600 bg-clip-text text-transparent drop-shadow-xl mb-6"
        >
          ZenFlow
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          className="text-lg md:text-2xl text-gray-700 leading-relaxed mb-12 px-2"
        >
          Your personal yoga coach for flexibility, strength, peace & wellness.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="space-y-4"
        >
          <Button
            size="lg"
            onClick={handleGetStarted}
            className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white text-lg font-semibold px-14 h-16 rounded-2xl shadow-2xl transition-all duration-300"
          >
            Get Started
          </Button>
          
          <div className="flex items-center gap-4 pt-8 border-t border-gray-200">
            <p className="text-sm text-gray-500 flex-1 text-left">
              Premium wellness experience • Free to start
            </p>
            <Button variant="ghost" size="sm" onClick={handleReset}>
              Reset App
            </Button>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}

