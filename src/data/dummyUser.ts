import type { UserProfile, Session } from '@/types'

// Realistic dummy data to make app feel live
export const dummyProfile = {
  name: 'Sarah Johnson',
  age: 32,
  gender: 'female',
  height: 165,
  weight: 62,
  experience: 'intermediate',
  goal: 'flexibility',
  dailyTime: 30,
  preferredTime: 'morning',
  problemAreas: ['lower back'],
  difficultyPreference: 'balanced'
};

export const dummySessions: Session[] = [
  { id: '1', date: '2024-10-10', duration: 28, completed: true, difficultyFelt: 3, moodBefore: 2, moodAfter: 4, poses: ['tadasana', 'vrikshasana'] },
  { id: '2', date: '2024-10-11', duration: 0, completed: false, difficultyFelt: 0, moodBefore: 0, moodAfter: 0, poses: [] },
  { id: '3', date: '2024-10-12', duration: 32, completed: true, difficultyFelt: 4, moodBefore: 3, moodAfter: 5, poses: ['trikonasana', 'vrikshasana'] },
  // 10+ sessions with streak of 5 days
];
