export interface Asana {
  id: string
  name: string
  sanskrit: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  duration: number // seconds
  benefits: string[]
  targets: string[]
  contraindications: string[]
  instructions: string[]
  breathing: string
  commonMistakes: string[]
  image: string // placeholder url
  category: string
}

export interface UserGoal {
  id: string
  name: string
  targets: string[]
}

export interface UserProfile {
  email?: string
  name: string
  age: number
  gender?: string
  height: number
  weight: number
  experience: 'beginner' | 'intermediate' | 'advanced'
  goal: string
  dailyTime: number
  preferredTime: 'morning' | 'afternoon' | 'evening'
  problemAreas: string[]
  difficultyPreference: 'gentle' | 'balanced' | 'intense'
}

export interface Session {
  id: string
  date: string
  duration: number
  completed: boolean
  difficultyFelt: number
  moodBefore: number
  moodAfter: number
  poses: string[] // asana ids
}

export type DifficultyLevel = 1 | 2 | 3 | 4 | 5
