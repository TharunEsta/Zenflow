import type { UserGoal } from '@/types'

export const goals: UserGoal[] = [
  {
    id: 'flexibility',
    name: 'Improve Flexibility',
    targets: ['hamstrings', 'hips', 'shoulders', 'spine']
  },
  {
    id: 'strength',
    name: 'Build Strength',
    targets: ['core', 'legs', 'arms', 'back']
  },
  {
    id: 'stress-relief',
    name: 'Stress Relief',
    targets: ['nervous system', 'mind']
  },
  {
    id: 'weight-loss',
    name: 'Weight Loss',
    targets: ['metabolism', 'full body']
  },
  {
    id: 'back-pain',
    name: 'Back Pain Relief',
    targets: ['spine', 'lower back']
  },
  {
    id: 'posture',
    name: 'Better Posture',
    targets: ['spine', 'shoulders']
  },
  {
    id: 'sleep',
    name: 'Better Sleep',
    targets: ['nervous system']
  }
];
