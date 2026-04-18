// Utility functions for ZenFlow
import { asanas } from '@/data/asanas'
import type { UserProfile } from '@/types'

export const generateDailyRoutine = (profile: UserProfile | null): string[] => {
  if (!profile) return ['tadasana', 'vrikshasana']
  
  const availablePoses = asanas.filter(a => 
    a.difficulty === profile.experience || 
    (profile.experience === 'beginner' && a.difficulty === 'intermediate')
  )
  const routine: string[] = []
  
  // Logic based on goal, time, etc.
  if (profile.goal === 'flexibility') {
    routine.push('paschimottanasana', 'trikonasana')
  }
  
  routine.push('tadasana', 'vrikshasana', 'balasana')
  return routine.slice(0, 5)
}

export const getLevelFromSessions = (totalSessions: number): string => {
  if (totalSessions < 7) return 'Level 1 - Started Journey'
  if (totalSessions < 14) return 'Level 2 - Momentum Builder'
  return 'Level 3 - Flow Master'
}

export const cn = (...classes: string[]) => classes.filter(Boolean).join(' ')
