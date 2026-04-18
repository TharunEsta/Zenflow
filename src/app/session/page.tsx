"use client"

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ProgressRing } from '@/components/ui/progress-ring'
import { useUserStore } from '@/lib/stores/useUserStore'
import { useProgressStore } from '@/lib/stores/useProgressStore'
import { generateDailyRoutine } from '@/lib/utils'
import { asanas } from '@/data/asanas'
import { Play, Pause, ChevronLeft, ChevronRight, Clock, CheckCircle } from 'lucide-react'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'
import { notify } from '@/components/ui/toast'
import type { UserProfile } from '@/types'

const fallbackProfile: UserProfile = {
  name: "Guest",
  age: 25,
  gender: "",
  height: 170,
  weight: 70,
  experience: "beginner",
  goal: "wellness",
  dailyTime: 15,
  preferredTime: "morning",
  problemAreas: [],
  difficultyPreference: "balanced"
}

export default function Session() {
  const profile = useUserStore((state) => state.profile || fallbackProfile)
  const completeToday = useProgressStore((state) => state.completeToday)
  
  const routine = generateDailyRoutine(profile)
  const [currentPoseIndex, setCurrentPoseIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [sessionTime, setSessionTime] = useState(0)

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isPlaying) {
      interval = setInterval(() => setSessionTime((prev) => prev + 1), 1000)
    }
    return () => clearInterval(interval)
  }, [isPlaying])

  const currentAsana = asanas.find(a => a.id === routine[currentPoseIndex])

  const handleCompletePose = () => {
    const isGoodPosture = Math.random() > 0.2
    if (!isGoodPosture) {
      notify('Adjust shoulders back - breathe deeply', 'default')
    } else {
      notify('Perfect form!', 'success')
    }
    
    if (currentPoseIndex < routine.length - 1) {
      setCurrentPoseIndex(currentPoseIndex + 1)
    } else {
      completeToday(sessionTime, 3)
      notify('Great session! Streak maintained 🔥', 'success')
    }
  }

  if (!currentAsana) {
    return <div>Loading pose...</div>
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 via-yellow-50 pb-20">
      <div className="p-6">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 text-center"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-500 to-orange-500 bg-clip-text text-transparent">
              Today's Flow
            </h1>
            <Badge className="bg-green-500/20 text-green-600 border-green-500/30">30 min</Badge>
          </div>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span>{currentPoseIndex + 1} / {routine.length}</span>
            <Clock className="h-4 w-4" />
            <span>{Math.floor(sessionTime / 60)}:{(sessionTime % 60).toString().padStart(2, '0')}</span>
          </div>
        </motion.div>

        <motion.div 
          key={currentAsana.id}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="mb-8"
        >
          <Card className="shadow-2xl border-0 overflow-hidden bg-white/80 backdrop-blur-xl">
            <div className="aspect-video bg-gradient-to-br from-purple-500/30 relative">
              <img src={currentAsana.image || '/poses/placeholder.jpg'} alt={currentAsana.name} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <h2 className="text-2xl font-bold text-white mb-1">{currentAsana.name}</h2>
                <p className="text-white/90 text-sm mb-2">{currentAsana.sanskrit}</p>
                <div className="flex gap-2">
                  <Badge variant="secondary" className="text-xs">{currentAsana.difficulty}</Badge>
                  <Badge className="text-xs bg-white/20 text-white">{currentAsana.duration}s</Badge>
                </div>
              </div>
            </div>
            <CardContent className="p-6">
              <h3 className="font-semibold mb-3">Instructions</h3>
              <ul className="space-y-1 text-sm text-muted-foreground mb-6">
                {currentAsana.instructions.slice(0, 3).map((instruction, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-purple-500 rounded-full mt-2 flex-shrink-0" />
                    {instruction}
                  </li>
                ))}
              </ul>
              
              <div className="flex items-center gap-3">
                <ProgressRing progress={Math.min(100, (sessionTime * 100) / 1800)} size={50} />
                <div className="flex-1 text-right">
                  <Button 
                    onClick={handleCompletePose}
                    className="bg-gradient-to-r from-purple-500 via-pink-400 to-orange-400 w-full h-14 text-lg shadow-lg hover:shadow-xl"
                  >
                    {currentPoseIndex < routine.length - 1 ? 'Next Pose' : 'Complete Session'}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              Full Routine <span className="text-sm font-normal text-muted-foreground">(5 poses)</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {routine.map((poseId, i) => {
              const pose = asanas.find((a) => a.id === poseId)
const isCurrent = i === currentPoseIndex

return (
  <Badge
    key={poseId}
    variant={isCurrent ? "default" : "secondary"}
    className={cn(
      "text-xs px-3 py-1",
      isCurrent
        ? "animate-pulse shadow-md bg-purple-500 text-white"
        : ""
    )}
  >
    {String(pose?.name || poseId).split(" ")[0]}
  </Badge>
)

              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

