import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import type { UserProfile } from '@/types'

interface UserState {
  email: string | null
  profile: UserProfile | null
  isAuthenticated: boolean
  isOnboarded: boolean
  isPremium: boolean
  setAuth: (email: string, isAuth: boolean) => void
  setProfile: (profile: UserProfile) => void
  setOnboarded: (onboarded: boolean) => void
  logout: () => void
  updateGoal: (goalId: string) => void
  isFreeTier: boolean
  reset: () => void
}

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      email: null,
      profile: null,
      isAuthenticated: false,
      isOnboarded: false,
      isPremium: false,
      setAuth: (email, isAuth) => set({ email, isAuthenticated: isAuth }),
      setProfile: (profile) => set({ profile, isOnboarded: true }),
      setOnboarded: (onboarded) => set({ isOnboarded: onboarded }),
      logout: () => set({ email: null, profile: null, isAuthenticated: false, isOnboarded: false }),
      updateGoal: (goalId: string) => {
        const profile = get().profile
        if (profile) {
          set({ profile: { ...profile, goal: goalId } })
        }
      },
      isFreeTier: true,
      reset: () => set({ 
        email: null,
        profile: null,
        isAuthenticated: false,
        isOnboarded: false,
        isPremium: false 
      })
    }),
    {
      name: 'zenflow-user-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ 
        email: state.email, 
        profile: state.profile,
        isAuthenticated: state.isAuthenticated,
        isOnboarded: state.isOnboarded,
        isPremium: state.isPremium 
      })
    }
  )
)

// Devtools disabled in production


