"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { useUserStore } from '@/lib/stores/useUserStore'
import { useRouter } from 'next/navigation'
import { goals } from '@/data/goals'
import { cn } from '@/lib/utils'
import { ChevronLeft, ChevronRight, Check } from 'lucide-react'
import type { UserProfile } from '@/types'

type ExperienceLevel = 'beginner' | 'intermediate' | 'advanced'
type DifficultyPreference = 'gentle' | 'balanced' | 'intense'
type PreferredTime = 'morning' | 'afternoon' | 'evening'

const steps = [
  { title: 'Tell us about you', fields: ['name', 'age', 'gender', 'height', 'weight'] },
  { title: 'Your goals', fields: ['experience', 'goal', 'dailyTime', 'preferredTime'] },
  { title: 'Session style', fields: ['difficultyPreference'] },
  { title: 'Ready to start!', fields: [] }
]

type Step = 0 | 1 | 2 | 3

export default function Onboarding() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState<Step>(0)
  const setProfile = useUserStore((state) => state.setProfile)
  const setOnboarded = useUserStore((state) => state.setOnboarded)
  const isOnboarded = useUserStore((state) => state.isOnboarded)

  const [formData, setFormData] = useState<UserProfile>({
    name: '',
    age: 30,
    gender: '',
    height: 170,
    weight: 65,
    experience: 'beginner',
    goal: 'flexibility',
    dailyTime: 30,
    preferredTime: 'morning',
    problemAreas: [],
    difficultyPreference: 'balanced'
  })

  const nextStep = () => setCurrentStep((prev) => (prev < 3 ? (prev + 1) as Step : prev))
  const prevStep = () => setCurrentStep((prev) => (prev > 0 ? (prev - 1) as Step : prev))

  const handleSubmit = () => {
    setProfile(formData)
    setOnboarded(true)
    router.push('/dashboard')
  }

  const stepContent = [
    <div key="0" className="space-y-6">
      <div>
        <label className="block text-sm font-medium mb-2">Name</label>
        <Input 
          value={formData.name} 
          onChange={(e) => setFormData({...formData, name: e.target.value})}
          placeholder="Enter your name"
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">Age</label>
          <Input 
            type="number" 
            value={formData.age} 
            onChange={(e) => setFormData({...formData, age: Number(e.target.value)})}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Height (cm)</label>
          <Input 
            type="number" 
            value={formData.height} 
            onChange={(e) => setFormData({...formData, height: Number(e.target.value)})}
          />
        </div>
      </div>
    </div>,
    
    <div key="1" className="space-y-6">
      <div>
        <h3 className="font-semibold mb-4">Experience Level</h3>
        <div className="grid grid-cols-3 gap-3">
          {(['beginner', 'intermediate', 'advanced'] as ExperienceLevel[]).map((level) => (
            <Button 
              key={level}
              variant={formData.experience === level ? "zenGradient" : "outline"}
              className="h-16 rounded-xl"
              onClick={() => setFormData({...formData, experience: level})}
            >
              {level.charAt(0).toUpperCase() + level.slice(1)}
            </Button>
          ))}
        </div>
      </div>
      <div>
        <h3 className="font-semibold mb-4">Main Goal</h3>
        <div className="grid grid-cols-2 gap-3">
          {goals.map((goal) => (
            <Button 
              key={goal.id}
              variant={formData.goal === goal.id ? "zenGradient" : "outline"}
              className="h-16 rounded-xl"
              onClick={() => setFormData({...formData, goal: goal.id})}
            >
              {goal.name}
            </Button>
          ))}
        </div>
      </div>
    </div>,
    
    <div key="2" className="space-y-6">
      <div>
        <h3 className="font-semibold mb-4">Daily Time</h3>
        <div className="grid grid-cols-2 gap-3">
          {[15, 30, 45, 60].map((time) => (
            <Button 
              key={time}
              variant={formData.dailyTime === time ? "zenGradient" : "outline"}
              className="h-16 rounded-xl"
              onClick={() => setFormData({...formData, dailyTime: time})}
            >
              {time} min
            </Button>
          ))}
        </div>
      </div>
    </div>,
    
    <div key="3" className="text-center space-y-6">
      <Check className="h-24 w-24 mx-auto text-green-500" />
      <div>
        <h2 className="text-3xl font-bold mb-2">Welcome {formData.name}!</h2>
        <p className="text-lg text-muted-foreground">Your personalized yoga journey starts now</p>
      </div>
      <p className="text-sm text-muted-foreground">Daily {formData.dailyTime}min {formData.goal} flows</p>
    </div>
  ]

  if (isOnboarded) {
    router.push('/dashboard')
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 via-white to-pink-50 p-4 flex items-center justify-center">
      <Card className="w-full max-w-md shadow-2xl border-0 bg-white/70 backdrop-blur-xl">
        <CardHeader className="text-center">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
            ZenFlow Onboarding
          </h1>
          <CardDescription className="pt-2">
            Step {currentStep + 1} of 4
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {stepContent[currentStep]}
        </CardContent>
        <div className="p-6 pt-0 flex items-center justify-between">
          <Button 
            variant="ghost" 
            onClick={prevStep}
            className="gap-2"
            disabled={currentStep === 0}
          >
            <ChevronLeft className="h-4 w-4" />
            Back
          </Button>
          <div className="flex items-center gap-2">
            {currentStep === 3 ? (
              <Button className="bg-gradient-to-r from-purple-500 via-pink-400 to-orange-400 gap-2 shadow-lg" onClick={handleSubmit}>
                Complete Setup
                <ChevronRight className="h-4 w-4" />
              </Button>
            ) : (
              <Button className="bg-gradient-to-r from-purple-500 via-pink-400 to-orange-400 gap-2 shadow-lg" onClick={nextStep}>
                Next Step
                <ChevronRight className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </Card>
    </div>
  )
}

