import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Session } from '@/types'
import { dummySessions } from '@/data/dummyUser'

interface ProgressState {
  sessions: Session[]
  currentStreak: number
  totalSessions: number
  flexibilityScore: number
  challengeDays: number
  challengeStartDate: string | null
  challengeCompleted: boolean
  addSession: (session: Session) => void
  completeToday: (duration: number, difficulty: number) => void
  calculateStreak: () => number
  getChallengeProgress: () => { current: number, total: 90, remaining: number }
}

export const useProgressStore = create<ProgressState>()(
  persist(
    (set, get) => ({
      sessions: dummySessions,
      currentStreak: 3,
      totalSessions: dummySessions.filter(s => s.completed).length,
      flexibilityScore: 72,
      challengeDays: 0,
      challengeStartDate: '2024-10-01',
      challengeCompleted: false,
      addSession: (session) => set((state) => ({
        sessions: [...state.sessions, session],
        totalSessions: state.totalSessions + 1
      })),
      completeToday: (duration, difficulty) => {
        const today = new Date().toISOString().split('T')[0]
        const state = get()
        const todaySession = state.sessions.find(s => s.date === today)
        
        if (!todaySession) {
          const newSession: Session = {
            id: Date.now().toString(),
            date: today,
            duration,
            completed: true,
            difficultyFelt: difficulty,
            moodBefore: 3,
            moodAfter: 4,
            poses: ['tadasana', 'vrikshasana', 'balasana']
          }
          
          let newChallengeDays = state.challengeDays
          if (!state.challengeStartDate) {
            set({ challengeStartDate: today })
          } else {
            newChallengeDays = Math.min(90, state.challengeDays + 1)
          }
          
          set((state) => ({
            sessions: [...state.sessions, newSession],
            totalSessions: state.totalSessions + 1,
            currentStreak: state.currentStreak + 1,
            flexibilityScore: Math.min(100, state.flexibilityScore + 2),
            challengeDays: newChallengeDays,
            challengeCompleted: newChallengeDays >= 90
          }))
        }
      },
      calculateStreak: () => get().currentStreak,
      getChallengeProgress: () => ({
        current: get().challengeDays,
        total: 90,
        remaining: Math.max(0, 90 - get().challengeDays)
      })
    }),
    {
      name: 'zenflow-progress-storage',
    }
  )
)

